import { Router } from 'express';
import { newsRoutes } from './newsRoutes';
import { bioRoutes } from './bioRoutes';

export const createRoutes = (): Router => {
	const router = Router();
	router.use('/news', newsRoutes());
	router.use('/bio', bioRoutes());
	return router;
};