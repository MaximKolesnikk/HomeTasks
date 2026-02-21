import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment', description: 'Текст комментария' })
  @IsNotEmpty({ message: 'Комментарий не может быть пустым' })
  text: string;
}
