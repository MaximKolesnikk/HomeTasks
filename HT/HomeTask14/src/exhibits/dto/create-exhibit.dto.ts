import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateExhibitDto {
  @ApiProperty({ example: 'Exhibit Name', description: 'Название экспоната' })
  @IsNotEmpty({ message: 'Название экспоната не может быть пустым' })
  name: string;

  @ApiProperty({ example: 'This is a description', description: 'Описание экспоната' })
  @IsNotEmpty({ message: 'Описание экспоната не может быть пустым' })
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Файл изображения' })
  image?: any;

  @ApiProperty({ example: 1, description: 'ID пользователя, создавшего экспонат' })
  @IsInt({ message: 'ID пользователя должен быть числом' })
  userId: number;
}
