import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
	imports: [
		ConfigModule,
		PassportModule,
		UsersModule,
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
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
