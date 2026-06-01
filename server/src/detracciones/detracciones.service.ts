import { Injectable, OnModuleInit } from '@nestjs/common';
import { BigQuery } from '@google-cloud/bigquery';
import { TipoDetraccionDto } from './dto/tipo-detraccion.dto';

type TipoDetraccionRow = {
  tipo_detraccion_id?: string;
  descripcion?: string;
  tasa_pct?: string | number;
  vigente?: boolean;
};

@Injectable()
export class DetraccionesService implements OnModuleInit {
  private bigquery!: BigQuery;
  private projectId!: string;
  private datasetId!: string;
  private tipoDetraccionTable!: string;

  onModuleInit() {
    this.projectId = process.env.BIGQUERY_PROJECT_ID ?? 'fazil-11f23';
    this.datasetId = process.env.BIGQUERY_DATASET ?? 'fazil_bd';
    this.tipoDetraccionTable =
      process.env.BIGQUERY_TIPO_DETRACCION_TABLE ?? 'dim_tipo_detraccion';
    this.bigquery = new BigQuery({ projectId: this.projectId });
  }

  async findAll(): Promise<TipoDetraccionDto[]> {
    const targetTable = `${this.projectId}.${this.datasetId}.${this.tipoDetraccionTable}`;
    const query = `
      SELECT tipo_detraccion_id, descripcion, tasa_pct, vigente
      FROM \`${targetTable}\`
      WHERE vigente = TRUE
      ORDER BY tipo_detraccion_id
    `;
    const [rows] = await this.bigquery.query({ query });

    return (rows as TipoDetraccionRow[]).map((row) => ({
      tipoDetraccionId: row.tipo_detraccion_id ?? '',
      descripcion: row.descripcion ?? '',
      tasaPct: Number(row.tasa_pct ?? 0),
      vigente: row.vigente ?? true,
    }));
  }
}
