import { Router, Request, Response, NextFunction } from 'express';
import { getUserById, registerNewUser } from '../database/controllers/userControllers';
import { body, validationResult } from 'express-validator';

export const userRoutes = (): Router => {
	const router = Router();
	router.get('/:id', getUserById);
	router.post('/', [
		body('email').isEmail()
			.withMessage('Write your e-mail address in correct form.'),
		body('password').isLength({ min: 5 })
			.withMessage('Password has to be at least 5 chars long!')
			.matches(/\d/)
			.withMessage('Password has to include at least one number.')
	], async (req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		} return next();
	}, registerNewUser);
	return router;
};