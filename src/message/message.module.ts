import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Messages } from 'src/entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Messages])],
	providers: [MessageService],
	controllers: [MessageController],
})
export class MessageModule {}
