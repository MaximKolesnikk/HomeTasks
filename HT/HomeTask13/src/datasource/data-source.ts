import { DataSource } from 'typeorm';
import { User } from '../entity/user';
import { NewsPost } from '../entity/NewPost';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'lesson13',

  synchronize: false,           
  logging: true,  
  entities: [User,NewsPost],
  // entities: ['src/entities/*.ts'],      
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});