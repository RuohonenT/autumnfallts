import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { News } from '../models/News';

//fetch all lines from News table
export const getNews = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const newsRepository = getRepository(News);
		const news = await newsRepository.find();
		return res.status(200).json(news);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};


//add news to News table
// export const addNews = async (
// 	req: Request,
// 	res: Response
// ): Promise<Response> => {
// 	try {
// 		const { _id, _subject, _content } = req.body;
// 		const newsRepository = getRepository(Books);
// 		const existingNews = await newsRepository.findOne({ where: { _id } });
// 		if (!existingNews) {
// 			const news = new Books();
// 			news.id = id;
// 			news._subject = _subject;
// 			news._content = _content;
// 			const newNews = await newsRepository.save(news);
// 			return res.status(200).json({ msg: 'News added to database', news: newNews });
// 		}
// 		return res.status(409).json({ error: 'This news code is already in database' });
// 	}
// 	catch (err) {
// 		return res.status(501).json({ error: 'Server error' });
// 	}
// };

// export const deleteNews = async (
// 	req: Request,
// 	res: Response
// ): Promise<Response> => {
// 	try {
// 		const { id } = req.body;
// 		const newsRepository = getRepository(Books);
// 		const found = await newsRepository.find({ id });
// 		if (found[0] !== undefined) {
// 			const news = await newsRepository.delete({ id });
// 			if (news) {
// 				return res.status(200).json({ msg: 'News removed' });
// 			}
// 			return res.status(501).json({ error: 'Server error' });
// 		}
// 		return res.status(404).json({ error: 'News not found' });
// 	}
// 	catch (err) {
// 		return res.status(501).json({ error: 'Server error' });
// 	}
// };


// const News = require('../models/news');
// const router = express.Router();

// router.get('/', (req, res) => {
//     News.retrieveAll((err, news) => {
//         if (err)
//             return res.json(err);
//         return res.json(news);
//     });
// });

// router.post('/', (req, res) => {
//     let news = req.body.news;
//     News.insert(news, (err, result) => {
//         if (err)
//             return res.json(err);
//         return res.json(result);
//     });
// });

// module.exports = router;

export { };