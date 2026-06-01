import { Module } from '@nestjs/common';
import { DetraccionesController } from './detracciones.controller';
import { DetraccionesService } from './detracciones.service';

@Module({
  controllers: [DetraccionesController],
  providers: [DetraccionesService],
})
export class DetraccionesModule {}
