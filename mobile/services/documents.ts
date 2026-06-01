import { api } from '@/services/api';

export type InvoiceDocumentData = {
  fecha?: string;
  fechaVencimiento?: string;
  proveedor?: string;
  ruc?: string;
  receptorNombre?: string;
  receptorRuc?: string;
  serie?: string;
  numero?: string;
  moneda?: string;
  opGravada?: number;
  igv?: number;
  importeTotal?: number;
  tasaIgvPct?: number;
  tasaDetraccionPct?: number;
  montoDetraccion?: number;
};

export type InvoiceItemData = {
  codigo?: string;
  descripcion?: string;
  cantidad?: number;
  unidadMedida?: string;
  precioUnitario?: number;
  importeTotal?: number;
};

export type ExtractedInvoiceDocument = {
  document: InvoiceDocumentData;
  items: InvoiceItemData[];
  raw?: {
    confidence?: number;
  };
};

export type UploadableDocumentAsset = {
  uri: string;
  name?: string | null;
  mimeType?: string | null;
};

type ReactNativeFormFile = {
  uri: string;
  name: string;
  type: string;
};

export async function extractInvoiceDocument(asset: UploadableDocumentAsset) {
  const formData = new FormData();
  const file: ReactNativeFormFile = {
    uri: asset.uri,
    name: asset.name ?? 'comprobante.pdf',
    type: asset.mimeType ?? 'application/pdf',
  };

  formData.append('file', file as unknown as Blob);

  return api.upload('/documents/extract', formData) as Promise<ExtractedInvoiceDocument>;
}
