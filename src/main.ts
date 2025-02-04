import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const corsOptions: CorsOptions = {
		origin: 'http://localhost:4200', // 👈 Cambia esto según tu frontend
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		allowedHeaders: 'Content-Type, Authorization',
		credentials: true, // 👈 Permitir cookies y autenticación con credenciales
	};
	app.enableCors(corsOptions);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
