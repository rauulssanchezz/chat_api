import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
	constructor(
		@InjectRepository(Messages)
		private messageRepository: Repository<Messages>,
	) {}

	async createMessage(
		content: string,
		originId: number,
		destinyId: number,
		date: Date,
	) {
		const message = new Messages(content, originId, destinyId, date);
		await this.messageRepository.save(message);

		return 'Message sent!';
	}

	async getMessagesByUser(receiverId: number, senderId: number) {
		const messages = await this.messageRepository.find({
			where: [
				{ senderId: senderId, receiverId: receiverId },
				{ senderId: receiverId, receiverId: senderId },
			],
			order: { date: 'ASC' },
		});

		return messages;
	}
}
