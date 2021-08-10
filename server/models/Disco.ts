import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Disco {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	albumtitle!: string;

	// @Column('int')
	// tracknumber!: number;

	@Column('varchar')
	tracktitle!: string;

	@Column('varchar')
	description!: string;
};