import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { News } from '../../models/News';


export const getNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const newsRepository = getRepository(News);
		const allNews = await newsRepository.find();
		return res.status(200).json(allNews);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const addNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { subject, content } = req.body;
	try {
		const newsRepository = getRepository(News);
		const news = new News();
		let time = new Date();
		news.subject = subject;
		news.content = content;
		news.date = time.toLocaleString();
		await newsRepository.save(news)
		return res.status(200).json({ msg: 'News added', news });
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error with addNews' });
	}
};

