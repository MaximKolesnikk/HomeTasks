import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comments.entity';

@Entity('exhibits')
export class Exhibit {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Уникальный идентификатор экспоната' })
  id: string;

  @Expose()
  @Column()
  @ApiProperty({ example: 'Exhibit Name', description: 'Название экспоната' })
  name: string;

  @Expose()
  @Column()
  @ApiProperty({ example: 'This is a description', description: 'Описание экспоната' })
  description: string;

  @Expose()
  @Column()
  @ApiProperty({ example: 'image.jpg', description: 'Имя файла изображения' })
  image: string;

  @Expose()
  @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => User, description: 'Пользователь, создавший экспонат' })
  user: User;

  @Column()
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.exhibit, { cascade: true })
  @ApiProperty({ type: () => [Comment], description: 'Комментарии к экспонату' })
  comments: Comment[];
}
