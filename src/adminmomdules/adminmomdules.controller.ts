import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { AdminmomdulesService } from './adminmomdules.service';
import { ApiOperation, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin Modules') 
@Controller('adminmomdules')
export class AdminmomdulesController {
  constructor(private readonly adminmomdulesService: AdminmomdulesService) {}

  @Post('showdata')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = path.join(process.cwd(), 'uploads');
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + path.extname(file.originalname));
        },
      }),
    }),
  )
  @ApiOperation({ summary: 'آپلود و پردازش یک فایل' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'آپلود فایل برای پردازش',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async processAdminFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No valid file uploaded', 400);
    }

    console.log('File uploaded to disk:', file);

    const filePath = file.path;
    console.log('File path:', filePath);

    let fileContent: Buffer;
    try {
      fileContent = fs.readFileSync(filePath);
    } catch (err) {
      throw new HttpException(`Failed to read file: ${err.message}`, 400);
    }

    console.log('File content:', fileContent.toString('utf-8'));

    try {
      const data = await this.adminmomdulesService.showdata({
        ...file,
        buffer: fileContent,
      });

      return { dataa: data };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  @Post('encryptdata')
  @ApiOperation({ summary: 'رمزگذاری داده‌ها و ذخیره آن‌ها' })
  @ApiBody({
    description: 'ارسال داده‌ها برای رمزگذاری',
    schema: {
      type: 'object',
      properties: {
        dataa: { type: 'object' },
      },
    },
  })
  async encryptData(@Body() body: { dataa: any }) {
    if (!body || !body.dataa) {
      throw new HttpException('Invalid body, "dataa" is required', 400);
    }

    console.log('Data received for encryption:', body.dataa);

    try {
      const data = body.dataa;
      const dummyFile = { filename: `${Date.now()}` } as Express.Multer.File;
      await this.adminmomdulesService.createacess(data, dummyFile);

      return { message: 'Data encrypted and saved successfully' };
    } catch (error) {
      throw new HttpException(`Encryption failed: ${error.message}`, 400);
    }
  }
}
