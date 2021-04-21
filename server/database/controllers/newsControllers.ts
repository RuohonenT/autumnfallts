import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { news } from '../../models/News';


export const getNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const newsRepository = getRepository(news);
		const allNews = await newsRepository.find();
		return res.status(200).json(allNews);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};


// export const getNews = async (
// 	req: Request,
// 	res: Response
// ): Promise<Response> => {
// 	try {
// 		const newsRepository = getRepository(News);
// 		const news = await newsRepository.find();
// 		return res.status(200).json(news);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(501).json({ error: "Server error" });
// 	}
// };