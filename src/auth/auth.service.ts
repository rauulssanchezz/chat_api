import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/entities/users.entity';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jtwService: JwtService,
	) {}

	async validateUser(
		email: string,
		password: string,
	): Promise<Users | string> {
		const user: Users | string =
			await this.usersService.getUserByEmail(email);
		if (typeof user === 'string') {
			return user;
		}
		if (user && (await bcrypt.compare(password, user.password))) {
			const { ...result } = user;
			return result;
		}
		throw new UnauthorizedException('Invalid credentials');
	}

	login(user: Users) {
		const payload = { email: user.email };
		return {
			access_token: this.jtwService.sign(payload),
			refresh_token: this.jtwService.sign(payload, { expiresIn: '7d' }),
		};
	}

	tokenIsValid(token: string) {
		try {
			this.jtwService.verify(token);
			return true;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return false;
		}
	}

	refreshToken(refreshToken: string) {
		try {
			const decoded: { email: string } =
				this.jtwService.verify(refreshToken);
			const payload = { email: decoded.email };

			return {
				access_token: this.jtwService.sign(payload),
				refresh_token: this.jtwService.sign(payload, {
					expiresIn: '7d',
				}),
			};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			throw new UnauthorizedException('Invalid credentials');
		}
	}
}
