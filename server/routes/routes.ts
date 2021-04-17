import { Router } from 'express';
import newsRoutes from './newsRoutes';

export const createRoutes = (): Router => {
	const router = Router();
	router.use('/news', newsRoutes());
	return router;
};