import { Request, Response } from 'express';
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
		return res.status(501).json({ error: 'Server error' });
	}
};

export const addNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { subject, content } = req.body;
	try {
		const newsRepository = getRepository(news);
		const News = new news();
		let time = new Date();
		News.subject = subject;
		News.content = content;
		News.date = time.toLocaleString();
		await newsRepository.save(News)
		return res.status(200).json({ msg: 'News added', News });
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error with addNews' });
	}
};

export const deleteNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.body;
		const newsRepository = getRepository(news);
		const found = await newsRepository.find({ id });
		if (found[0] !== undefined) {
			const News = await newsRepository.delete({ id });
			if (News) {
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

export const getNewsById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const newsRepository = getRepository(news);
		const News = await newsRepository.find({ where: { id } });
		return res.status(200).json(News);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const updateNewsById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { subject } = req.body;
	const id = req.body.id;
	try {
		const newsRepository = getRepository(news);
		const News = await newsRepository.find({ where: { id } });
		if (News) {
			newsRepository.update({ id }, { subject });
			return res.status(200).json("News updated");
		}
		else {
			return res.status(501).json({ error: "Database error" });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: "Server error" });
	}
};