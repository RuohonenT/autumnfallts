import pool from '../index';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

export const getById = async (
	req: Request,
	res: Response,
	table: string,
	id: string): Promise<Response> => {
	try {
		const queryText = 'SELECT * FROM $1 WHERE id = $2';
		const values = [table, id];
		const queryResult = await pool.query(queryText, values);
		console.log('result', queryResult);
		return res.status(200).send(queryResult.rows);
	} catch (err) {
		return res.status(501).json({ error: 'Server error' });
	}
};


// get all rows from table
export const getAll = async (
	req: Request,
	res: Response,
	table: string): Promise<Response> => {
	try {
		const queryText = 'SELECT * FROM $1';
		const values = [table];
		const queryResult = await pool.query(queryText, values);
		return res.status(200).send(queryResult.rows);
	} catch (err) {
		return res.status(501).json({ error: 'Server error' });
	}
};