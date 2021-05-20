import { Router } from 'express';
import { getBio, addBio, deleteBio, updateBioById } from '../database/controllers/bioControllers';

export const bioRoutes = (): Router => {
	const router = Router();
	router.get('/', getBio);
	router.post('/add', addBio);
	router.put('/edit/:id', updateBioById);
	router.delete('/delete', deleteBio);
	return router
};
