import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { Messages } from './entities/message.entity';
import { MessageModule } from './message/message.module';

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
					entities: [Users, Messages],
					synchronize: true,
				};
			},
			inject: [ConfigService],
		}),
		UsersModule,
		AuthModule,
		MessageModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
