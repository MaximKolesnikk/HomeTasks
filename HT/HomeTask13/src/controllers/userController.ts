import { Controller, Get, Post, Patch, Delete, Body, Param, HttpError } from 'routing-controllers';
import { AppDataSource } from '../datasource/data-source';
import { User } from '../entity/user';

const userRepository = AppDataSource.getRepository(User);

@Controller()
export class UserController {

  @Get('/')
  getAuthor() {
    return { author: 'MaxDixon322' };
  }

  @Get('/users')
  async getUsers() {
    const users = await userRepository.find();
    console.log('Fetched users:', users);
    return users;
  }

@Post('/users')
async createUser(@Body() body: any) {
  console.log('POST /users вызван. Полученное тело:', body);

 
  const userName = body?.user || 'DefaultUser';
  const email = body?.email || 'default@example.com';

  const newUser = userRepository.create({
    id: Date.now().toString(),
    user: userName,
    email: email,
  });

  await userRepository.save(newUser);

  console.log('Пользователь создан:', newUser);
  return newUser;
}
  @Patch('/users/:id')
  async updateUser(@Param('id') id: string, @Body() userData: Partial<User>) {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    userRepository.merge(user, userData);
    await userRepository.save(user);

    return user;
  }

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string) {
    const user = await userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpError(404, 'User not found');
    }

    await userRepository.remove(user);
    return { message: 'User deleted' };
  }
}