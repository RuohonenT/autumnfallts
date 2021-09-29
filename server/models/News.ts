import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class News {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	subject!: string;

	@Column()
	content!: string;

	@Column()
	date!: string;
};
