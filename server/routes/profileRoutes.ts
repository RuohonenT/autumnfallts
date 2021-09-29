import { Router } from 'express';
import { getOwnProfile } from '../database/controllers/profileControllers';
import auth from '../middlewares/authMiddleware';

export const profileRoutes = (): Router => {
	const router = Router();
	router.get('/me', auth, getOwnProfile);
	return router;
};