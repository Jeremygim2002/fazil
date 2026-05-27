// src/auth/auth.service.ts
import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import * as admin from 'firebase-admin';
import { BigQuery } from '@google-cloud/bigquery';

@Injectable()
export class AuthService implements OnModuleInit {
  private bigquery: BigQuery;
  private projectId: string;
  private datasetId: string;
  private userTable: string;

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }

    this.projectId = process.env.BIGQUERY_PROJECT_ID ?? 'fazil-11f23';
    this.datasetId = process.env.BIGQUERY_DATASET ?? 'fazil_bd';
    this.userTable = process.env.BIGQUERY_USER_TABLE ?? 'dim_usuario';

    this.bigquery = new BigQuery({
      projectId: this.projectId,
    });
  }

  async verifyTokenAndSaveUser(clientToken: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(clientToken);
      const uid = decodedToken.uid;
      const email = decodedToken.email || '';
      const name = decodedToken.name || 'Usuario';

      await this.saveUserToBigQuery(uid, name, email);

      return { uid, email, name };
    } catch (error: unknown) {
      throw new UnauthorizedException(`Token inválido: ${String(error)}`);
    }
  }

  private async saveUserToBigQuery(
    uid: string,
    nombre: string,
    correo: string,
  ) {
    const targetTable = `${this.projectId}.${this.datasetId}.${this.userTable}`;
    const query = `
      MERGE \`${targetTable}\` T
      USING (SELECT @uid AS usuario_id, @nombre AS nombre_completo, @correo AS correo_electronico) S
      ON T.usuario_id = S.usuario_id
      WHEN NOT MATCHED THEN
        INSERT (usuario_id, nombre_completo, correo_electronico, fecha_creacion)
        VALUES (S.usuario_id, S.nombre_completo, S.correo_electronico, CURRENT_TIMESTAMP())
    `;

    await this.bigquery.query({
      query: query,
      params: { uid, nombre, correo },
    });
  }
}
