import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { SunatService } from './sunat.service';

@Controller('sunat')
export class SunatController {
  constructor(private readonly sunatService: SunatService) {}

  @Get('ruc/:ruc')
  async findRuc(@Param('ruc') ruc: string) {
    const normalizedRuc = ruc.replace(/\D/g, '');

    if (normalizedRuc.length !== 11) {
      throw new BadRequestException('El RUC debe tener 11 digitos');
    }

    return this.sunatService.findRuc(normalizedRuc);
  }
}
