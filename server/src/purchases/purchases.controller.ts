import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SavePurchaseDto } from './dto/save-purchase.dto';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(
    private readonly authService: AuthService,
    private readonly purchasesService: PurchasesService,
  ) {}

  @Post()
  async save(
    @Headers('authorization') authorization: string | undefined,
    @Body() body: SavePurchaseDto,
  ) {
    const user = await this.getUserFromAuthorization(authorization);

    return this.purchasesService.savePurchase(user, body);
  }

  @Get('dashboard')
  async dashboard(@Headers('authorization') authorization: string | undefined) {
    const user = await this.getUserFromAuthorization(authorization);

    return this.purchasesService.getDashboard(user);
  }

  private async getUserFromAuthorization(authorization: string | undefined) {
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : undefined;

    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    return this.authService.getUserProfile(token);
  }
}
