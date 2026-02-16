import { Controller, Get, Post, Patch, Delete, Body, Param, HttpError } from 'routing-controllers';
import fs from 'fs/promises';
import { ValidateArgs } from '../decorators/validator';

const USERS_FILE = './src/users.json';

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users: any[]) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

@Controller()
export class UserController {
  @Get('/')
  getAuthor() {
    return { author: 'Your Name' };
  }

  @Get('/users')
  async getUsers() {
    const users = await readUsers();
    console.log('Fetched users:', users);
    return users;
  }

@Post('/users')
  @ValidateArgs('validateUser')
  async createUser(@Body() body: { user: string; email: string }) {
    console.log('Controller received body:', body); 
  
    const users = await readUsers();
    const newUser = { id: Date.now(), user: body.user, email: body.email };
    users.push(newUser);
    await writeUsers(users);
  
    return newUser;
  }

@Patch('/users/:id')
async updateUser(@Param('id') id: string, @Body() body: { user?: string; email?: string }) {   
  const users = await readUsers();
  const userIndex = users.findIndex((u: any) => u.id === Number(id));

  if (userIndex === -1) {
    throw new HttpError(404, 'User not found');
  }


  if (body.user && body.user.length < 2) {
    throw new HttpError(400, 'User name must be at least 2 characters long');
  }
  if (body.email && !body.email.includes('@')) {
    throw new HttpError(400, 'A valid email is required');
  }

  users[userIndex] = { ...users[userIndex], ...body };
  await writeUsers(users);

  return users[userIndex];
}

  @Delete('/users/:id')
  async deleteUser(@Param('id') id: string) {
    const users = await readUsers();
    const filteredUsers = users.filter((u: any) => u.id !== Number(id));

    if (users.length === filteredUsers.length) {
      throw new HttpError(404, 'User not found');
    }

    await writeUsers(filteredUsers);

    return { message: 'User deleted' };
  }
}