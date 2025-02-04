import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {}

	async createUser(
		name: string,
		email: string,
		password: string,
	): Promise<string> {
		const hashPass = await bcrypt.hash(password, 10);
		const user = new User(name, email, hashPass);
		await this.userRepository.save(user);

		return 'User created succesfully!';
	}

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async getUserByEmail(email: string): Promise<User | string> {
		return (
			(await this.userRepository.findOne({ where: { email: email } })) ||
			'User not found!'
		);
	}

	async getUserById(id: number): Promise<User | string> {
		return (
			(await this.userRepository.findOne({ where: { id: id } })) ||
			'User not found!'
		);
	}

	async updateUser(id: number, name: string, email: string): Promise<string> {
		const user = await this.getUserById(id);

		if (typeof user === 'string') {
			return 'User not found!';
		}

		user.email = email;
		user.name = name;

		await this.userRepository.save(user);

		return 'User updated succesfully!';
	}
}
