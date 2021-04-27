import { Router } from 'express';
import { getNews, addNews } from '../database/controllers/newsControllers';

export const newsRoutes = (): Router => {
	const router = Router();
	router.get('/', getNews);
	router.post('/add', addNews);
	// router.delete('/delete', deleteNews);
	return router;
};