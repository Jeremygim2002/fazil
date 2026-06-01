import { api } from '@/services/api';

export type RucConsultation = {
  ruc: string;
  razonSocial: string | null;
  estado: string | null;
  condicion: string | null;
  direccion: string | null;
  ubigeo: string | null;
  distrito: string | null;
  provincia: string | null;
  region: string | null;
  isActive: boolean;
  isHabido: boolean;
  source: 'graph-peru';
};

export async function getRucConsultation(ruc: string) {
  const normalizedRuc = ruc.replace(/\D/g, '');

  return api.get(`/sunat/ruc/${normalizedRuc}`) as Promise<RucConsultation>;
}
