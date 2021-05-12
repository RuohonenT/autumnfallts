import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Bio {
	@PrimaryColumn('text')
	content!: string;
};