import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  @ApiQuery({ name: 'id', required: false, description: 'ID пользователя' })
  @ApiQuery({ name: 'username', required: false, description: 'Имя пользователя' })
  @ApiResponse({ status: 200, description: 'Успешное получение списка пользователей' })
  @ApiResponse({ status: 404, description: 'Пользователи не найдены' })
  async getAllUsers(@Query('id') id?: number, @Query('username') username?: string) {
    if (!id && !username) {
      throw new NotFoundException('ID или username должны быть указаны');
    }

    const user = id
      ? await this.usersService.findById(id)
      : username
      ? await this.usersService.findByUsername(username)
      : null;

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Get('my-profile')
  @ApiOperation({ summary: 'Получение информации о текущем пользователе' })
  @ApiResponse({ status: 200, description: 'Информация о текущем пользователе' })
  async getMyProfile(@Request() req: any) {
    const userId = req.user.id;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto.username, createUserDto.password);
    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }
}
