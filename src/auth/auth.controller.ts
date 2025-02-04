import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() body: { email: string; password: string }) {
		const user: User | string = await this.authService.validateUser(
			body.email,
			body.password,
		);

		if (typeof user === 'string') {
			return user;
		}

		return this.authService.login(user);
	}

	@Post('refresh')
	refreshToken(@Body() body: { refreshToken: string }) {
		return this.authService.refreshToken(body.refreshToken);
	}
}
