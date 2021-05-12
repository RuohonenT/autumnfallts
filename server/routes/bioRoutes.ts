import { Router } from 'express';
import { getBio, addBio, editBio } from '../database/controllers/bioControllers';

export const bioRoutes = (): Router => {
	const router = Router();
	router.get('/', getBio);
	router.post('/add', addBio);
	router.put('edit', editBio);
	return router
};
