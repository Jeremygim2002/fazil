export type ExtractedInvoiceDocumentDto = {
  fecha: string | null;
  fechaVencimiento: string | null;
  proveedor: string | null;
  ruc: string | null;
  receptorNombre: string | null;
  receptorRuc: string | null;
  serie: string | null;
  numero: string | null;
  moneda: string | null;
  opGravada: number | null;
  igv: number | null;
  importeTotal: number | null;
  tasaIgvPct: number | null;
  tasaDetraccionPct: number | null;
  montoDetraccion: number | null;
};

export type ExtractedInvoiceItemDto = {
  codigo: string | null;
  descripcion: string | null;
  cantidad: number | null;
  unidadMedida: string | null;
  precioUnitario: number | null;
  importeTotal: number | null;
};

export type ExtractedInvoiceRawEntityDto = {
  type: string;
  mentionText: string;
  normalizedValue: string | null;
  confidence: number | null;
  properties: ExtractedInvoiceRawEntityDto[];
};

export type ExtractedInvoiceDto = {
  document: ExtractedInvoiceDocumentDto;
  items: ExtractedInvoiceItemDto[];
  raw: {
    confidence: number | null;
    text: string;
    entities: ExtractedInvoiceRawEntityDto[];
  };
};
