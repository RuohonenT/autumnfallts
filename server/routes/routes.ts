import { Router } from 'express';
import auth from "../middlewares/authMiddleware";
import { userRoutes } from './userRoutes';
import { newsRoutes } from './newsRoutes';
import { bioRoutes } from './bioRoutes';
import { loginRoutes } from './loginRoutes';
import { profileRoutes } from './profileRoutes';

export const createRoutes = (): Router => {
	const router = Router();
	router.use('/users', userRoutes());
	router.use('/news', newsRoutes());
	router.use('/bio', bioRoutes());
	router.use('/login', loginRoutes());
	router.use('/profile', auth, profileRoutes());
	return router;
};