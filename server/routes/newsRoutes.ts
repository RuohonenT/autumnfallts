import { Router } from 'express';
import { getNews, addNews, deleteNews } from '../database/controllers/newsControllers';

const newsRoutes = (): Router => {
	const router = Router();
	router.get('/', getNews);
	router.post('/post', addNews);
	router.delete('/delete', deleteNews);
	return router;
};

export default newsRoutes;