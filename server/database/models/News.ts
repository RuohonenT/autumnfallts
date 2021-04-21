import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class news {

	@PrimaryColumn()
	id!: number;

	@Column()
	subject!: string;

	@Column()
	content!: string;
}
