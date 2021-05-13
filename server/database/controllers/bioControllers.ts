import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Bio } from '../../models/Bio';

export const addBio = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { content } = req.body;
	try {
		const bioRepository = getRepository(Bio);
		const bio = new Bio();
		bio.content = content;
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

export const editBio = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { content } = req.body;
	try {
		const bioRepository = getRepository(Bio);
		const bio = await bioRepository.find({ content });
		if (bio) {
			bioRepository.update(content, { content: content });
			return res.status(200).json('Bio updated');
		} else {
			return res.status(501).json({ error: 'Database error with editBio' });
		}
	} catch (err) {
		console.log('editBio serverside issue', err);
		return res.status(501).json({ error: 'Server error' });
	};
};