import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from '../exhibits/exhibit.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Уникальный идентификатор пользователя' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: 'username123', description: 'Имя пользователя' })
  username: string;

  @Column()
  @ApiProperty({ example: 'hashedpassword123', description: 'Пароль пользователя' })
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({ type: () => [Exhibit], description: 'Список экспонатов, добавленных пользователем' })
  exhibits: Exhibit[];
}
