import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Disco } from '../../models/Disco';

export const addAlbum = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { albumtitle, tracktitle, description } = req.body;
	try {
		const discoRepository = getRepository(Disco);
		const disco = new Disco();
		disco.albumtitle = albumtitle;
		// disco.tracknumber = tracknumber;
		disco.tracktitle = tracktitle;
		disco.description = description;
		await discoRepository.save(disco);
		return res.status(200).json({ msg: 'Album added', disco });
	} catch (err) {
		console.log('addAlbum serverside error', err);
		return res.status(501).json({ error: 'Server error with addAlbum' });
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

export const editAlbumById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { albumtitle, tracktitle, description } = req.body;
	const { id } = req.params;
	try {
		const discoRepository = getRepository(Disco);
		const disco = await discoRepository.find({ where: { id } });
		if (disco) {
			discoRepository.update(id, { albumtitle: albumtitle, tracktitle: tracktitle, description: description });
			return res.status(200).json('Album info updated');
		} else {
			return res.status(501).json({ error: 'Database error' });
		}
	} catch (err) {
		console.log('Album update error', err);
		return res.status(501).json({ error: 'Server error' });
	}
};

