import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import { UserController } from './controllers/userController';
import express from 'express';

const expressApp = express();

expressApp.use(express.json());

const app = createExpressServer({
  controllers: [UserController], 
});

expressApp.use(app);

const port = 3000;
expressApp.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});