import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from '../exhibits/exhibit.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Уникальный идентификатор комментария' })
  id: string;

  @Column()
  @ApiProperty({ example: 'This is a comment', description: 'Текст комментария' })
  text: string;

  @Column()
  @ApiProperty({ example: 1, description: 'ID экспоната, к которому добавлен комментарий' })
  exhibitId: string;

  @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'exhibitId' })
  @ApiProperty({ type: () => Exhibit, description: 'Экспонат, к которому добавлен комментарий' })
  exhibit: Exhibit;
}
