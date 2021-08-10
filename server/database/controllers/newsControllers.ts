import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { News } from '../../models/News';

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
		await newsRepository.save(news);
		return res.status(200).json({ msg: 'News added', news });
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error with addNews' });
	}
};

export const getNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const newsRepository = getRepository(News);
		const allNews = await newsRepository.find();
		const sortedAllNews = allNews.sort((a, b) => +new Date(b.id) - +new Date(a.id));
		return res.status(200).json(sortedAllNews);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const getNewsById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const newsRepository = getRepository(News);
		const news = await newsRepository.find({ where: { id } });
		return res.status(200).json(news);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const updateNewsById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { subject, content } = req.body;
	const { id } = req.params;
	try {
		const newsRepository = getRepository(News);
		const news = await newsRepository.find({ where: { id } });
		if (news) {
			newsRepository.update(id, { subject: subject, content: content });
			return res.status(200).json('News updated');
		}
		else {
			return res.status(501).json({ error: 'Database error' });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const deleteNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.body;
		const newsRepository = getRepository(News);
		const found = await newsRepository.find({ id });
		if (found[0] !== undefined) {
			const news = await newsRepository.delete({ id });
			if (news) {
				return res.status(200).json({ msg: 'News removed' });
			}
			return res.status(501).json({ error: 'Server error' });
		}
		return res.status(404).json({ error: 'News not found' });
	}
	catch (err) {
		return res.status(501).json({ error: 'Server error' });
	}
};
