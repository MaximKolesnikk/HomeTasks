import { Controller, Post, Get, Param, Body, Delete, UseInterceptors, UploadedFile, BadRequestException, NotFoundException, Request, Res, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { ExhibitsService } from './exhibits.service';
import { CreateExhibitDto } from './dto/create-exhibit.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import * as fs from 'fs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('exhibits')
@ApiBearerAuth()
@Controller('exhibits')
@UseGuards(JwtAuthGuard)
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового экспоната с изображением' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary', description: 'Файл изображения' },
        name: { type: 'string', description: 'Название экспоната' },
        description: { type: 'string', description: 'Описание экспоната' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Экспонат успешно создан' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, uniqueFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(
            new BadRequestException('Поддерживаются только форматы jpg, jpeg и png'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createExhibitDto: CreateExhibitDto,
    @Request() req: any,
  ) {
    if (!file) {
      throw new BadRequestException('Файл изображения обязателен');
    }
    const userId = req.user.id; 
    return this.exhibitsService.createWithImage(createExhibitDto, file.filename, userId);
  }

  @Get('static/:filename')
  @ApiOperation({ summary: 'Получение изображения по имени файла' })
  @ApiResponse({ status: 200, description: 'Файл успешно получен' })
  @ApiResponse({ status: 404, description: 'Файл не найден' })
  async getStaticFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, '..', '..', 'uploads', filename);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Файл не найден');
    }
    return res.sendFile(filePath);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех экспонатов' })
  @ApiResponse({ status: 200, description: 'Успешно получены все экспонаты' })
  findAll() {
    return this.exhibitsService.findAll();
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Получение экспоната по ID' })
  @ApiResponse({ status: 200, description: 'Экспонат найден' })
  @ApiResponse({ status: 404, description: 'Экспонат не найден' })
  async getExhibit(@Param('id') id: string) {
    const exhibit = await this.exhibitsService.findOne(id);
    if (!exhibit) {
      throw new NotFoundException('Экспонат не найден');
    }
    return exhibit;
  }

  @Get('my-posts')
  @ApiOperation({ summary: 'Получение всех экспонатов текущего пользователя' })
  @ApiResponse({ status: 200, description: 'Список экспонатов текущего пользователя' })
  async getMyPosts(@Request() req: any) {
    const userId = req.user.id;
    return this.exhibitsService.findByUser(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление экспоната по ID' })
  @ApiResponse({ status: 200, description: 'Экспонат успешно удалён' })
  remove(@Param('id') id: string) {
    return this.exhibitsService.remove(id);
  }
}
