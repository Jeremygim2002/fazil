export type PurchaseDashboardSummaryDto = {
  totalMes: number;
  detraccionPendiente: number;
  promedioComprobante: number;
  comprobantesMes: number;
  validados: number;
  observados: number;
};

export type PurchaseDashboardRecordDto = {
  transactionId: string;
  proveedorId: string;
  proveedorNombre: string | null;
  fechaId: number;
  serieComprobante: string | null;
  numeroComprobante: string | null;
  importeTotal: number;
  montoDetraccion: number | null;
  validacionEstado: string;
  validacionErrores: string | null;
};

export type PurchaseProviderMetricDto = {
  proveedorId: string;
  proveedorNombre: string | null;
  total: number;
  comprobantes: number;
};

export type PurchaseDashboardDto = {
  summary: PurchaseDashboardSummaryDto;
  recent: PurchaseDashboardRecordDto[];
  history: PurchaseDashboardRecordDto[];
  topProviders: PurchaseProviderMetricDto[];
};
