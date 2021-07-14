import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disco {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	albumtitle!: string;

	@Column('int')
	tracknumber!: number;

	@Column('varchar')
	tracktitle!: string;

	@Column('bytea')
	filename!: string;

	@Column()
	views!: number;

	@Column()
	isPublished!: boolean;
};