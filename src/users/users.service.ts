import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<string> {
    const user = new UserEntity(name, email, password);
    await this.userRepository.save(user);

    return 'User created succesfully!';
  }

  async getUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<UserEntity | string> {
    return (
      (await this.userRepository.findOne({ where: { email: email } })) ||
      'User not found!'
    );
  }

  async getUserById(id: number): Promise<UserEntity | string> {
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
