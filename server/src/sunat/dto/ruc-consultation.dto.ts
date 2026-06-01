export type RucConsultationDto = {
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

export type GraphPeruBusinessResponse = {
  documentID?: string;
  documentId?: string;
  name?: string;
  nombre?: string;
  state?: string;
  estado?: string;
  condition?: string;
  condicion?: string;
  ['condición']?: string;
  address?: string;
  direccion?: string;
  ['dirección']?: string;
  ubigeo?: string;
  district?: string;
  distrito?: string;
  province?: string;
  provincia?: string;
  region?: string;
  ['región']?: string;
  resourceOf?: string;
  error?: string;
  message?: string;
};
