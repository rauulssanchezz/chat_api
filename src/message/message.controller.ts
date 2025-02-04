import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth/jwt-auth.guard';

@Controller('message')
export class MessageController {
	constructor(private messageService: MessageService) {}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	createMessage(
		@Body()
		body: {
			content: string;
			senderId: number;
			receiverId: number;
		},
	) {
		const date = new Date();
		return this.messageService.createMessage(
			body.content,
			body.senderId,
			body.receiverId,
			date,
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getByUser')
	getMessageByUser(@Query() query: { receiverId: number; senderId: number }) {
		console.log({ query });
		return this.messageService.getMessagesByUser(
			query.receiverId,
			query.senderId,
		);
	}
}
