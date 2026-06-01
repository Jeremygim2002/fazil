import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { DocumentsService } from './documents.service';

const allowedMimeTypes = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
]);

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('extract')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 12 * 1024 * 1024 },
      storage: memoryStorage(),
    }),
  )
  async extract(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Archivo requerido en el campo file.');
    }

    if (!allowedMimeTypes.has(file.mimetype)) {
      throw new BadRequestException('Solo se aceptan archivos PDF, JPG o PNG.');
    }

    return this.documentsService.extractInvoice(file);
  }
}
