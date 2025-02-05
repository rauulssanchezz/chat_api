import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Not, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>,
		private jwtService: JwtService,
	) {}

	async createUser(
		name: string,
		email: string,
		password: string,
	): Promise<object> {
		const hashPass = await bcrypt.hash(password, 10);
		const user = new Users(name, email, hashPass);

		const exists = await this.userRepository.findOne({
			where: { email: email },
		});

		if (exists) {
			return { response: 'User already exists!', exists: true };
		} else {
			await this.userRepository.save(user);
		}

		return { response: 'User created succesfully!', exists: false };
	}

	async getUsers(token: string): Promise<Users[]> {
		const decoded: { email: string } = this.jwtService.verify(token);
		const email = decoded.email;
		return await this.userRepository.find({ where: { email: Not(email) } });
	}

	async getUserByEmail(email: string): Promise<Users | string> {
		return (
			(await this.userRepository.findOne({ where: { email: email } })) ||
			'User not found!'
		);
	}

	async updateUser(name: string, email: string): Promise<string> {
		const user = await this.getUserByEmail(email);

		if (typeof user === 'string') {
			return 'User not found!';
		}

		user.email = email;
		user.name = name;

		await this.userRepository.save(user);

		return 'User updated succesfully!';
	}
}
