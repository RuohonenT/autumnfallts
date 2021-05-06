import { Router } from 'express';
import { getNews, addNews, deleteNews, getNewsById, updateNewsById } from '../database/controllers/newsControllers';

export const newsRoutes = (): Router => {
	const router = Router();
	router.get('/', getNews);
	router.post('/add', addNews);
	router.get('/:id', getNewsById);
	router.put('/edit/:id', updateNewsById);
	router.delete('/delete', deleteNews);
	return router;
};