import 'reflect-metadata';
import { createExpressServer, useExpressServer } from 'routing-controllers';
import { UserController } from './controllers/userController';
import express from 'express';
import { AppDataSource } from './datasource/data-source';

AppDataSource.initialize()
  .then(() => {
    console.log('PostgreSQL підключено успішно');

    const app = express();

    app.use(express.json({ limit: '10mb' }));           
    app.use(express.urlencoded({ extended: true }));   

   
    app.use((req, res, next) => {
      console.log('=== DEBUG: НОВИЙ ЗАПИТ ===');
      console.log('Method: ', req.method);
      console.log('Path:   ', req.path);
      console.log('Content-Type: ', req.headers['content-type']);
      console.log('Body (після парсингу): ', req.body);
      next();
    });

   
    useExpressServer(app, {
      controllers: [UserController],
      validation: true,
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Сервер запущено → http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Помилка підключення до БД:', err);
    process.exit(1);
  });