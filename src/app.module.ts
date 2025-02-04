import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => {
				const host = await Promise.resolve(
					configService.get<string>('DB_HOST'),
				); // Simulando async
				return {
					type: 'mysql',
					host,
					port: configService.get<number>('DB_PORT'),
					username: configService.get<string>('DB_USERNAME'),
					password: configService.get<string>('DB_PASSWORD'),
					database: configService.get<string>('DB_DATABASE'),
					entities: [User],
					synchronize: true,
				};
			},
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
