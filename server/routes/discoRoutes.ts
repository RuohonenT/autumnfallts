import { Router } from 'express';
import { getDisco, addAlbum, editAlbumById } from '../database/controllers/discoController';

export const discoRoutes = (): Router => {
	const router = Router();
	router.get('/', getDisco);
	router.post('/add', addAlbum);
	router.put('/edit/:id', editAlbumById);
	return router;
};