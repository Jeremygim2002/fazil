import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PurchaseSunatDto {
  @IsString()
  @IsNotEmpty()
  ruc!: string;

  @IsString()
  @IsOptional()
  razonSocial?: string | null;

  @IsString()
  @IsOptional()
  estado?: string | null;

  @IsString()
  @IsOptional()
  condicion?: string | null;

  @IsString()
  @IsOptional()
  direccion?: string | null;

  @IsString()
  @IsOptional()
  ubigeo?: string | null;

  @IsString()
  @IsOptional()
  distrito?: string | null;

  @IsString()
  @IsOptional()
  provincia?: string | null;

  @IsString()
  @IsOptional()
  region?: string | null;

  @IsBoolean()
  isActive!: boolean;

  @IsBoolean()
  isHabido!: boolean;

  @IsString()
  @IsOptional()
  source?: string | null;
}

export class PurchaseDocumentDto {
  @IsString()
  ruc!: string;

  @IsString()
  invoiceNumber!: string;

  @IsString()
  issueDate!: string;

  @IsString()
  @IsOptional()
  sedeNombre?: string | null;

  @IsString()
  @IsOptional()
  ubicacion?: string | null;

  @IsNumber()
  @IsOptional()
  subtotal?: number | null;

  @IsNumber()
  @IsOptional()
  igv?: number | null;

  @IsNumber()
  @IsOptional()
  total?: number | null;

  @IsNumber()
  @IsOptional()
  detractionRate?: number | null;

  @IsNumber()
  @IsOptional()
  detractionAmount?: number | null;

  @IsString()
  @IsOptional()
  detractionTypeId?: string | null;

  @IsString()
  @IsOptional()
  detractionDescription?: string | null;

  @ValidateNested()
  @Type(() => PurchaseSunatDto)
  @IsOptional()
  sunat?: PurchaseSunatDto | null;
}

export class PurchaseItemDto {
  @IsString()
  @IsOptional()
  codigo?: string | null;

  @IsString()
  @IsOptional()
  descripcion?: string | null;

  @IsNumber()
  @IsOptional()
  cantidad?: number | null;

  @IsString()
  @IsOptional()
  unidadMedida?: string | null;

  @IsNumber()
  @IsOptional()
  precioUnitario?: number | null;

  @IsNumber()
  @IsOptional()
  importeTotal?: number | null;
}

export class SavePurchaseDto {
  @IsNumber()
  @IsOptional()
  sourceDocumentId?: number | null;

  @IsString()
  @IsNotEmpty()
  transactionId!: string;

  @IsIn(['success', 'error'])
  status!: 'success' | 'error';

  @IsArray()
  @IsString({ each: true })
  reasons!: string[];

  @ValidateNested()
  @Type(() => PurchaseDocumentDto)
  document!: PurchaseDocumentDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  items!: PurchaseItemDto[];

  @IsNumber()
  @IsOptional()
  confidence?: number | null;
}
