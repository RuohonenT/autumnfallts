import { Request, Response } from 'express';
import { Users } from '../../models/Users';
import { getRepository } from 'typeorm';



// get currently logged in users user information
export const getOwnProfile = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const id = req.body.user.id;
		const userRepository = getRepository(Users);
		const user = await userRepository.find({ where: { id } });
		const userInfo = {
			email: user[0].email,
			id: user[0].id
		};
		return res.status(200).json(userInfo);
	} catch (err) {
		console.log(err);
		return res.status(501).json({ error: 'Server error' });
	}
};