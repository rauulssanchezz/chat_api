import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from 'src/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
	imports: [
		TypeOrmModule.forFeature([Users]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>('jwt_secret'),
				signOptions: {
					expiresIn: configService.get<string>('jwt_expires_in'),
				},
			}),
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, JwtStrategy],
	exports: [UsersService],
})
export class UsersModule {}
