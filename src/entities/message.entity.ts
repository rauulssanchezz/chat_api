import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
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

	@ManyToOne(() => User, (user) => user.sentMessages)
	@JoinColumn({ name: 'senderId' })
	sender: User;

	@ManyToOne(() => User, (user) => user.receivedMessages)
	@JoinColumn({ name: 'receiverId' })
	receiver: User;

	@Column()
	senderId: number;

	@Column()
	receiverId: number;

	@Column()
	content: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	date: Date;
}
