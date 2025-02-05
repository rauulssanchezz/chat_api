import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Messages } from './message.entity';

@Entity()
export class Users {
	constructor(name: string, email: string, password: string) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
	@Column()
	name: string;

	@PrimaryColumn()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Messages, (message) => message.id)
	sentMessages: Messages[];

	@OneToMany(() => Messages, (message) => message.id)
	receivedMessages: Messages[];
}
