import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Disco } from '../../models/Disco';

export const addAlbum = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { albumtitle, year, tracktitles, description } = req.body;
	try {
		const discoRepository = getRepository(Disco);
		const disco = new Disco();
		disco.albumtitle = albumtitle;
		disco.year = year;
		disco.tracktitles = tracktitles;
		disco.description = description;
		await discoRepository.save(disco);
		return res.status(200).json({ msg: 'Album data added', disco });
	} catch (err) {
		console.log('addAlbum serverside error', err);
		return res.status(501).json({ err: 'Server error with addAlbum' });
	}
};

export const getDisco = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const discoRepository = getRepository(Disco);
		const disco = await discoRepository.find();
		return res.status(200).json(disco);
	} catch (err) {
		console.log('disco serverside issue', err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const getAlbumById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
		const discoRepository = getRepository(Disco);
		const disco = await discoRepository.find({ where: { id } });
		return res.status(200).json(disco);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const updateAlbumById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { albumtitle, year, description, tracktitles } = req.body;
	const { id } = req.params;
	try {
		const discoRepository = getRepository(Disco);
		const disco = await discoRepository.find({ where: { id } });
		if (disco) {
			discoRepository.update(id, { albumtitle: albumtitle, year: year, description: description, tracktitles: tracktitles });
			return res.status(200).json('Album info updated');
		} else {
			return res.status(501).json({ error: 'Database error' });
		}
	} catch (err) {
		console.log('Update error, updateAlbumById, line 39 => :: ', err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const deleteAlbum = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.body;
		const discoRepository = getRepository(Disco);
		const found = await discoRepository.find({ id });
		if (found[0] !== undefined) {
			const disco = await discoRepository.delete({ id });
			if (disco) {
				return res.status(200).json({ msg: 'Album removed' });
			} return res.status(501).json({ error: 'Server error' });
		} return res.status(404).json({ error: 'Album not found' });
	} catch (err) {
		return res.status(501).json({ error: 'Server error' });
	}
};

