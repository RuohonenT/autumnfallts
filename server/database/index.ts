import { Pool } from 'pg';
import 'dotenv/config';
const SSL = process.env.NODE_ENV === 'production';

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: { rejectUnauthorized: false }
});

pool.on('error', (error, client) => {
	console.error('Unexpected error on idle PostgreSQL client.', error);
	process.exit(-1);
});

export default pool;

// 		//if working locally
// const pool = new Pool({
// 	user: String(process.env.DB_USERNAME),
// 	password: String(process.env.DB_PASS),
// 	port: Number(process.env.DB_PORT),
// 	host: String(process.env.DB_HOST),
// 	database: String(process.env.DB_DATABASE)
// });