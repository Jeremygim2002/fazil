import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DetraccionesModule } from './detracciones/detracciones.module';
import { DocumentsModule } from './documents/documents.module';
import { PurchasesModule } from './purchases/purchases.module';
import { SunatModule } from './sunat/sunat.module';

@Module({
  imports: [
    AuthModule,
    DetraccionesModule,
    DocumentsModule,
    PurchasesModule,
    SunatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
