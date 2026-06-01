import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import {
  type GraphPeruBusinessResponse,
  type RucConsultationDto,
} from './dto/ruc-consultation.dto';

const GRAPH_PERU_BASE_URL = 'https://graphperu.daustinn.com/api/query';

@Injectable()
export class SunatService {
  async findRuc(ruc: string): Promise<RucConsultationDto> {
    const response = await fetch(`${GRAPH_PERU_BASE_URL}/${ruc}`, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new ServiceUnavailableException('No se pudo consultar Graph Peru');
    }

    const data = (await response.json()) as GraphPeruBusinessResponse;
    const documentId = data.documentID ?? data.documentId;

    if (!documentId) {
      throw new NotFoundException('RUC no encontrado');
    }

    const estado = data.estado ?? data.state ?? null;
    const condicion =
      data.condicion ?? data.condition ?? data['condición'] ?? null;

    return {
      ruc: documentId,
      razonSocial: data.nombre ?? data.name ?? null,
      estado,
      condicion,
      direccion: data.direccion ?? data.address ?? data['dirección'] ?? null,
      ubigeo: data.ubigeo ?? null,
      distrito: data.distrito ?? data.district ?? null,
      provincia: data.provincia ?? data.province ?? null,
      region: data.region ?? data['región'] ?? null,
      isActive: normalizeSunatValue(estado) === 'activo',
      isHabido: isHabidoCondition(condicion),
      source: 'graph-peru',
    };
  }
}

function isHabidoCondition(value: string | null) {
  const normalizedValue = normalizeSunatValue(value);

  return (
    normalizedValue.startsWith('habid') || normalizedValue.startsWith('habit')
  );
}

function normalizeSunatValue(value: string | null) {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}
