import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Disco } from './Disco';

@Entity()
export class DiscoMetadata {

	@PrimaryGeneratedColumn()
	id!: number;

	@Column("int")
	height!: number;

	@Column("int")
	width!: number;

	@Column()
	orientation!: string;

	@Column()
	compressed!: boolean;

	@Column()
	comment!: string;

	@OneToOne(type => Disco)
	@JoinColumn()
	disco!: Disco;
}