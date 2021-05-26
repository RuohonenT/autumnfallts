declare module 'express';
declare module 'cors';
declare module 'nodemailer';
declare module 'pg';

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DB_PORT: string;
			DB_HOST: string;
			DB_DATABASE: string;
			DB_USERNAME: string;
			DB_PASS: string;
			JWT_SECRET: string;
		}
	}
}

export { };