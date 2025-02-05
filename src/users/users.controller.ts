import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Post('create')
	create(@Body() body: { name: string; email: string; password: string }) {
		return this.userService.createUser(
			body.name,
			body.email,
			body.password,
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get('get')
	get() {
		return this.userService.getUsers();
	}

	@UseGuards(JwtAuthGuard)
	@Get('getByEmail')
	getByEmail(@Query() query: { email: string }) {
		return this.userService.getUserByEmail(query.email);
	}

	@UseGuards(JwtAuthGuard)
	@Put('update')
	update(@Body() body: { id: number; name: string; email: string }) {
		return this.userService.updateUser(body.name, body.email);
	}
}
