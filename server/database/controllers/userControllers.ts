import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Users } from '../../models/Users';
import { getRepository } from 'typeorm';

export const getUserById = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		const { id } = req.params;
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

export const registerNewUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const { email, password } = req.body;
	try {
		//Crypting password before it is saved to database
		const salt = await bcrypt.genSalt(10);
		const cryptedPassword = await bcrypt.hash(password, salt);

		const userRepository = getRepository(Users);
		// checking if user with given email already exists
		const existingUser = await userRepository.findOne({ where: { email } });
		if (!existingUser) {
			const newUser = new Users();
			newUser.email = email;
			newUser.password = cryptedPassword;
			newUser.is_admin = false;
			await userRepository.save(newUser);
			return res.status(200).json({ msg: 'Account created' });
		} else {
			return res.status(409).json({ msg: 'User already in database' })
		};
	} catch (err) {
		return res.status(409).json({ error: 'Server error' });
	}
};