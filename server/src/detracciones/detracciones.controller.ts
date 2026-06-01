import { Controller, Get } from '@nestjs/common';
import { DetraccionesService } from './detracciones.service';

@Controller('detracciones')
export class DetraccionesController {
  constructor(private readonly detraccionesService: DetraccionesService) {}

  @Get('tipos')
  async findAll() {
    return this.detraccionesService.findAll();
  }
}
