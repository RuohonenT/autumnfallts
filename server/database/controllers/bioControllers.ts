import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Bio } from '../../models/Bio';

export const addBio = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { header, content } = req.body;
	try {
		const bioRepository = getRepository(Bio);
		const bio = new Bio();
		bio.content = content;
		bio.header = header;
		await bioRepository.save(bio);
		return res.status(200).json({ msg: 'Bio added', bio });
	} catch (err) {
		console.log('addBio serverside error', err);
		return res.status(501).json({ error: 'Server error with addBio' });
	}
};

export const getBio = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const bioRepository = getRepository(Bio);
		const bio = await bioRepository.find();
		return res.status(200).json(bio);
	} catch (err) {
		console.log('bio serverside issue', err);
		return res.status(501).json({ error: 'Server error' });
	}
};


export const updateBioById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { header, content } = req.body;
	const { id } = req.params;
	try {
		const bioRepository = getRepository(Bio);
		const bio = await bioRepository.find({ where: { id } });
		if (bio) {
			bioRepository.update(id, { header: header, content: content });
			return res.status(200).json('Bio updated');
		}
		else {
			return res.status(501).json({ error: 'Database error' });
		}
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};

export const deleteBio = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.body;
		const bioRepository = getRepository(Bio);
		const found = await bioRepository.find({ id });
		if (found[0] !== undefined) {
			const bio = await bioRepository.delete({ id });
			if (bio) {
				return res.status(200).json({ msg: 'Bio removed' });
			}
			return res.status(501).json({ error: 'Server error' });
		}
		return res.status(404).json({ error: 'Bio not found' });
	}
	catch (err) {
		return res.status(501).json({ error: 'Server error' });
	}
};
