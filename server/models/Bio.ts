import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bio {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column('varchar')
	header!: string;

	@Column('varchar')
	content!: string;
};