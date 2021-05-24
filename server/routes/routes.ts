import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { newsRoutes } from './newsRoutes';
import { bioRoutes } from './bioRoutes';

export const createRoutes = (): Router => {
	const router = Router();
	router.use('/users', userRoutes());
	router.use('/news', newsRoutes());
	router.use('/bio', bioRoutes());
	return router;
};