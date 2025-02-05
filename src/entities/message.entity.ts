import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Messages {
	constructor(
		content: string,
		senderId: number,
		receiverId: number,
		date: Date,
	) {
		this.content = content;
		this.senderId = senderId;
		this.receiverId = receiverId;
		this.date = date;
	}

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Users, (user) => user.sentMessages)
	@JoinColumn({ name: 'senderEmail' })
	sender: Users;

	@ManyToOne(() => Users, (user) => user.receivedMessages)
	@JoinColumn({ name: 'receiverEmail' })
	receiver: Users;

	@Column()
	senderId: number;

	@Column()
	receiverId: number;

	@Column()
	content: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;
}
