import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(Users)
		private userRepository: Repository<Users>,
	) {}

	async createUser(
		name: string,
		email: string,
		password: string,
	): Promise<string> {
		const hashPass = await bcrypt.hash(password, 10);
		const user = new Users(name, email, hashPass);
		await this.userRepository.save(user);

		return 'User created succesfully!';
	}

	async getUsers(): Promise<Users[]> {
		return await this.userRepository.find();
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
