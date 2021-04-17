import { Router } from 'express';
import { getNews } from '../controllers/newsControllers';

const newsRoutes = (): Router => {
	const router = Router();
	router.get('/', getNews);
	// router.post('/add', addNews);
	// router.delete('/delete', deleteNews);
	return router;
};

export default newsRoutes;