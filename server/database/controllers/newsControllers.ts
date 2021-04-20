import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { news } from '../models/News';


export const getNews = async () => {
	const newsRepository = getRepository(news);
	let News = await newsRepository;
	return News;
};