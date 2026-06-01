import { getIdToken } from 'firebase/auth';

import { auth } from '@/firebaseConfig';
import { api } from '@/services/api';

export type PurchaseDashboardSummary = {
  totalMes: number;
  detraccionPendiente: number;
  promedioComprobante: number;
  comprobantesMes: number;
  validados: number;
  observados: number;
};

export type PurchaseDashboardRecord = {
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

export type PurchaseProviderMetric = {
  proveedorId: string;
  proveedorNombre: string | null;
  total: number;
  comprobantes: number;
};

export type PurchaseDashboard = {
  summary: PurchaseDashboardSummary;
  recent: PurchaseDashboardRecord[];
  history: PurchaseDashboardRecord[];
  topProviders: PurchaseProviderMetric[];
};

export async function getPurchaseDashboard() {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return null;
  }

  const token = await getIdToken(currentUser);

  return api.get('/purchases/dashboard', token) as Promise<PurchaseDashboard>;
}

export function formatMoney(value?: number | null) {
  return typeof value === 'number' ? `S/ ${value.toFixed(2)}` : 'S/ 0.00';
}

export function formatCompactMoney(value?: number | null) {
  return typeof value === 'number' ? `S/ ${Math.round(value).toLocaleString('es-PE')}` : 'S/ 0';
}

export function formatFechaId(value: number) {
  const rawValue = value.toString();

  if (rawValue.length !== 8) {
    return '-';
  }

  return `${rawValue.slice(6, 8)}/${rawValue.slice(4, 6)}/${rawValue.slice(0, 4)}`;
}

export function getRecordTitle(record: PurchaseDashboardRecord) {
  return [record.serieComprobante, record.numeroComprobante].filter(Boolean).join('-') || record.transactionId;
}

export function getProviderName(record: PurchaseDashboardRecord) {
  return record.proveedorNombre || record.proveedorId || 'Proveedor sin nombre';
}
