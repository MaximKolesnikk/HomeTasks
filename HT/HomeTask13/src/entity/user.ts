import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsString, MinLength, IsEmail } from 'class-validator';

@Entity('users')
export class User {
  @PrimaryColumn('bigint')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  @IsString()
  @MinLength(2, { message: 'User name must be at least 2 characters long' })
  user!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsEmail({}, { message: 'A valid email is required' })
  email!: string;
}