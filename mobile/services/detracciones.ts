import { api } from '@/services/api';

export type TipoDetraccion = {
  tipoDetraccionId: string;
  descripcion: string;
  tasaPct: number;
  vigente: boolean;
};

export async function getTiposDetraccion() {
  return api.get('/detracciones/tipos') as Promise<TipoDetraccion[]>;
}

export function getTipoDetraccionLabel(tipo: TipoDetraccion) {
  return `${tipo.tipoDetraccionId} - ${tipo.descripcion}`;
}
