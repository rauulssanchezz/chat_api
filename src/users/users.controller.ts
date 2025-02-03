import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('create')
  create(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.createUser(body.name, body.email, body.password);
  }

  @Get('get')
  get() {
    return this.userService.getUsers();
  }

  @Get('getById')
  getByName(@Query() query: { id: number }) {
    return this.userService.getUserById(query.id);
  }

  @Get('getByEmail')
  getByEmail(@Query() query: { email: string }) {
    return this.userService.getUserByEmail(query.email);
  }

  @Put('update')
  update(@Body() body: { id: number; name: string; email: string }) {
    return this.userService.updateUser(body.id, body.name, body.email);
  }
}
