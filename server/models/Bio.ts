import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Bio {
	@PrimaryColumn('varchar')
	header!: string;

	@Column('varchar')
	content!: string;
};