import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class News {

	@PrimaryColumn()
	id!: number;

	@Column()
	subject!: string;

	@Column()
	content!: string;
}
