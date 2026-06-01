import { BadRequestException, Injectable } from '@nestjs/common';
import {
  DocumentProcessorServiceClient,
  protos,
} from '@google-cloud/documentai';
import {
  ExtractedInvoiceDto,
  ExtractedInvoiceItemDto,
  ExtractedInvoiceRawEntityDto,
} from './dto/extracted-invoice.dto';

type DocumentEntity = protos.google.cloud.documentai.v1.Document.IEntity;
type DocumentAiDocument = protos.google.cloud.documentai.v1.IDocument;

@Injectable()
export class DocumentsService {
  private readonly client: DocumentProcessorServiceClient;

  constructor() {
    const location = process.env.DOCUMENT_AI_LOCATION ?? 'us';
    this.client = new DocumentProcessorServiceClient({
      apiEndpoint: `${location}-documentai.googleapis.com`,
    });
  }

  async extractInvoice(
    file: Express.Multer.File,
  ): Promise<ExtractedInvoiceDto> {
    const projectId = this.getRequiredEnv('DOCUMENT_AI_PROJECT_ID');
    const location = this.getRequiredEnv('DOCUMENT_AI_LOCATION');
    const processorId = this.getRequiredEnv('DOCUMENT_AI_PROCESSOR_ID');
    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    const [result] = await this.client.processDocument({
      name,
      rawDocument: {
        content: file.buffer.toString('base64'),
        mimeType: file.mimetype,
      },
    });

    if (!result.document) {
      throw new BadRequestException(
        'Document AI no devolvio un documento procesado.',
      );
    }

    return this.normalizeDocument(result.document);
  }

  private normalizeDocument(document: DocumentAiDocument): ExtractedInvoiceDto {
    const entities = document.entities ?? [];
    const rawEntities = entities.map((entity) => this.toRawEntity(entity));
    const lineItemEntities = entities.filter(
      (entity) => entity.type === 'line_item',
    );
    const text = document.text ?? '';

    return {
      document: {
        fecha: this.getEntityText(entities, ['invoice_date', 'date']),
        fechaVencimiento: this.getEntityText(entities, ['due_date']),
        proveedor: this.getEntityText(entities, [
          'supplier_name',
          'vendor_name',
          'remit_to_name',
        ]),
        ruc:
          this.getEntityText(entities, ['supplier_tax_id', 'vendor_tax_id']) ??
          this.findPeruvianRuc(text),
        receptorNombre: this.getEntityText(entities, ['receiver_name']),
        receptorRuc: this.getEntityText(entities, ['receiver_tax_id']),
        serie: this.extractInvoiceSeries(
          this.getEntityText(entities, ['invoice_id', 'invoice_number']),
        ),
        numero: this.extractInvoiceNumber(
          this.getEntityText(entities, ['invoice_id', 'invoice_number']),
        ),
        moneda: this.getEntityText(entities, ['currency']),
        opGravada: this.getEntityNumber(entities, [
          'net_amount',
          'subtotal_amount',
        ]),
        igv: this.getEntityNumber(entities, ['total_tax_amount', 'tax_amount']),
        importeTotal: this.getEntityNumber(entities, [
          'total_amount',
          'invoice_total_amount',
        ]),
        tasaIgvPct: this.extractIgvRate(entities, text),
        tasaDetraccionPct: this.extractDetractionRate(text),
        montoDetraccion: this.extractDetractionAmount(text),
      },
      items: lineItemEntities.map((entity) => this.toInvoiceItem(entity)),
      raw: {
        confidence: this.averageConfidence(entities),
        text,
        entities: rawEntities,
      },
    };
  }

  private toInvoiceItem(entity: DocumentEntity): ExtractedInvoiceItemDto {
    const properties = entity.properties ?? [];
    const codigo = this.getEntityText(properties, [
      'line_item/product_code',
      'product_code',
    ]);

    return {
      codigo,
      descripcion:
        this.getEntityText(properties, [
          'line_item/description',
          'description',
        ]) ?? this.extractLineItemDescription(entity.mentionText ?? '', codigo),
      cantidad: this.getEntityNumber(properties, [
        'line_item/quantity',
        'quantity',
      ]),
      unidadMedida: this.getEntityText(properties, [
        'line_item/unit',
        'unit',
        'unit_of_measure',
      ]),
      precioUnitario: this.getEntityNumber(properties, [
        'line_item/unit_price',
        'unit_price',
      ]),
      importeTotal: this.getEntityNumber(properties, [
        'line_item/amount',
        'amount',
      ]),
    };
  }

  private toRawEntity(entity: DocumentEntity): ExtractedInvoiceRawEntityDto {
    return {
      type: entity.type ?? '',
      mentionText: entity.mentionText ?? '',
      normalizedValue: this.getNormalizedText(entity),
      confidence:
        typeof entity.confidence === 'number' ? entity.confidence : null,
      properties: (entity.properties ?? []).map((property) =>
        this.toRawEntity(property),
      ),
    };
  }

  private getEntityText(entities: DocumentEntity[], types: string[]) {
    const entity = this.findEntity(entities, types);
    return entity
      ? (this.getNormalizedText(entity) ?? entity.mentionText ?? null)
      : null;
  }

  private getEntityNumber(entities: DocumentEntity[], types: string[]) {
    const text = this.getEntityText(entities, types);
    return this.parseNumber(text);
  }

  private findEntity(entities: DocumentEntity[], types: string[]) {
    return entities.find(
      (entity) => entity.type && types.includes(entity.type),
    );
  }

  private getNormalizedText(entity: DocumentEntity) {
    const normalizedValue = entity.normalizedValue;
    const normalizedText = normalizedValue?.text;
    const dateText = this.formatNormalizedDate(normalizedValue?.dateValue);

    return (
      normalizedText ??
      dateText ??
      normalizedValue?.moneyValue?.units?.toString() ??
      null
    );
  }

  private formatNormalizedDate(
    dateValue?: {
      year?: number | null;
      month?: number | null;
      day?: number | null;
    } | null,
  ) {
    if (!dateValue?.year || !dateValue.month || !dateValue.day) {
      return null;
    }

    const month = String(dateValue.month).padStart(2, '0');
    const day = String(dateValue.day).padStart(2, '0');

    return `${dateValue.year}-${month}-${day}`;
  }

  private parseNumber(value: string | null) {
    if (!value) {
      return null;
    }

    const normalized = value
      .replace(/[^\d,.-]/g, '')
      .replace(/\.(?=\d{3}(?:\D|$))/g, '')
      .replace(',', '.');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  private extractInvoiceSeries(invoiceId: string | null) {
    return invoiceId?.match(/[A-Z]\d{3}/i)?.[0]?.toUpperCase() ?? null;
  }

  private extractInvoiceNumber(invoiceId: string | null) {
    const match = invoiceId?.match(/[A-Z]\d{3}\s*[- ]\s*(\d+)/i);
    return match?.[1] ?? invoiceId?.match(/\d{3,}$/)?.[0] ?? null;
  }

  private extractLineItemDescription(
    mentionText: string,
    productCode: string | null,
  ) {
    let description = mentionText.trim();

    if (productCode) {
      description = description.replace(productCode, '').trim();
    }

    description = description
      .replace(/^\d{6,}\s*/, '')
      .replace(
        /\s+\d{1,3}(?:,\d{3})*(?:\.\d+)?\s+[A-Z]{2,4}\s+[\d,.]+\s+[\d,.]+\s+[\d,.]+$/i,
        '',
      )
      .trim();

    return description || null;
  }

  private findPeruvianRuc(text: string) {
    return text.match(/\b(10|20)\d{9}\b/)?.[0] ?? null;
  }

  private extractIgvRate(entities: DocumentEntity[], text: string) {
    const vatEntity = entities.find((entity) => entity.type === 'vat');
    const vatRate = vatEntity?.properties?.find(
      (property) => property.type === 'vat/tax_rate',
    );
    const parsedVatRate = this.parseNumber(
      this.getNormalizedText(vatRate ?? {}) ?? vatRate?.mentionText ?? null,
    );

    if (parsedVatRate !== null) {
      return parsedVatRate;
    }

    return this.parseNumber(
      text.match(/IGV\s*\(([\d,.]+)\s*%\)/i)?.[1] ?? null,
    );
  }

  private extractDetractionRate(text: string) {
    return this.parseNumber(
      text.match(/detracci[oó]n[\s\S]{0,160}?([\d,.]+)\s*%/i)?.[1] ??
        text.match(/D\.?\s*Leg\.?\s*940[\s\S]{0,120}?([\d,.]+)\s*%/i)?.[1] ??
        null,
    );
  }

  private extractDetractionAmount(text: string) {
    return this.parseNumber(
      text.match(/detracci[oó]n[\s\S]{0,180}?\(S\/\s*([\d,.]+)/i)?.[1] ??
        text.match(
          /D\.?\s*Leg\.?\s*940[\s\S]{0,160}?\(S\/\s*([\d,.]+)/i,
        )?.[1] ??
        null,
    );
  }

  private averageConfidence(entities: DocumentEntity[]) {
    const confidences = entities
      .map((entity) => entity.confidence)
      .filter(
        (confidence): confidence is number => typeof confidence === 'number',
      );

    if (confidences.length === 0) {
      return null;
    }

    return (
      confidences.reduce((sum, confidence) => sum + confidence, 0) /
      confidences.length
    );
  }

  private getRequiredEnv(name: string) {
    const value = process.env[name];
    if (!value) {
      throw new BadRequestException(`Falta configurar ${name}.`);
    }

    return value;
  }
}
