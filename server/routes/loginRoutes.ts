import { Router } from 'express';
import { login, checkLogin } from '../database/controllers/loginControllers';
import auth from '../middlewares/authMiddleware';

export const loginRoutes = (): Router => {
	const router = Router();
	router.post('/', login);
	router.get('/', auth, checkLogin);
	return router;
};