import { Router } from 'express';
import { getDisco, addAlbum, getAlbumById, updateAlbumById, deleteAlbumData } from '../database/controllers/discoController';

export const discoRoutes = (): Router => {
	const router = Router();
	router.get('/', getDisco);
	router.post('/add', addAlbum);
	router.get('/:id', getAlbumById);
	router.put('/edit/:id', updateAlbumById);
	router.delete('/edit/:id', deleteAlbumData);
	return router;
};