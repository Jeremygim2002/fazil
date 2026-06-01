// src/auth/auth.service.ts
import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { BigQuery } from '@google-cloud/bigquery';

type AuthUserProfile = {
  uid: string;
  email: string;
  name: string;
};

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);
  private bigquery: BigQuery;
  private projectId: string;
  private datasetId: string;
  private userTable: string;

  onModuleInit() {
    if (!getApps().length) {
      initializeApp({
        credential: applicationDefault(),
      });
    }

    this.projectId = process.env.BIGQUERY_PROJECT_ID ?? 'fazil-11f23';
    this.datasetId = process.env.BIGQUERY_DATASET ?? 'fazil_bd';
    this.userTable = process.env.BIGQUERY_USER_TABLE ?? 'dim_usuario';

    this.bigquery = new BigQuery({
      projectId: this.projectId,
    });
  }

  async verifyTokenAndSaveUser(clientToken: string): Promise<AuthUserProfile> {
    const user = await this.getUserProfile(clientToken);

    try {
      await this.saveUserToBigQuery(user.uid, user.name, user.email);
    } catch (error: unknown) {
      this.logger.warn(
        `No se pudo guardar usuario en BigQuery: ${String(error)}`,
      );
    }

    return user;
  }

  async getUserProfile(clientToken: string): Promise<AuthUserProfile> {
    let decodedToken: DecodedIdToken;

    try {
      decodedToken = await getAuth().verifyIdToken(clientToken);
    } catch (error: unknown) {
      throw new UnauthorizedException(`Token inválido: ${String(error)}`);
    }

    const uid = String(decodedToken.uid);
    const email =
      typeof decodedToken.email === 'string' ? decodedToken.email : '';
    const name =
      typeof decodedToken.name === 'string' ? decodedToken.name : 'Usuario';

    return { uid, email, name };
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
