import express from 'express';
import path from 'path';
import 'reflect-metadata';
// import { createConnection, Connection } from 'typeorm';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';
import { createRoutes } from './routes/routes';
import { News } from './models/News';
const { Client } = require('pg');
const nodemailer = require('nodemailer');
const router = express.Router();
const cors = require('cors')
const app = express()
const PORT: string | number = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/', router);
app.use('/', createRoutes());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	// 'catching-all' handler to send back React's index.html if a req doesn't match any endpoints above
	app.use((_req, res) => {
		res.sendFile(path.join(__dirname, './client/build/index.html'));
	});
}

if (process.env.NODE_ENV === 'development') {
	app.use(cors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: 'GET, PUT, POST, PATCH, DELETE'
	}));
}

app.listen(PORT, () => console.log(`hosting @${PORT}`));



const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

client.connect();

client.query('SELECT * FROM news;', (err: any, res: { rows: any; }) => {
	if (err) throw err;
	for (let row of res.rows) {
		console.log(JSON.stringify(row));
	}
	client.end();
});

// const config: PostgresConnectionOptions = {
// 	type: 'postgres',
// 	host: String(process.env.DB_HOST),
// 	port: Number(process.env.DB_PORT),
// 	username: String(process.env.DB_USERNAME),
// 	password: String(process.env.DB_PASSWORD),
// 	database: String(process.env.DB_DATABASE),
// 	synchronize: true,
// 	logging: false,
// 	entities: [
// 		News
// 	]
// };

// createConnection(config).then(async () => {
// 	console.log('Server is connected to PostgreSQL database.');
// }).catch(e => console.log(e));

// Nodemailer for Contact
const contactEmail = nodemailer.createTransport({
	host: String(process.env.CONTACT_HOST),
	port: Number(process.env.CONTACT_PORT),
	auth: {
		user: String(process.env.CONTACT_USER),
		pass: (process.env.CONTACT_PASS),
	},
});

contactEmail.verify((error: any) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Ready to Send');
	}
});

router.post('/contact', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const message = req.body.message;
	const mail = {
		from: name,
		to: 'gallowssong@gmail.com',
		subject: 'Contact Form Message',
		html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
	};
	contactEmail.sendMail(mail, (error: any) => {
		if (error) {
			res.json({ status: 'failed' });
		} else {
			res.json({ status: 'sent' });
		}
	});
});
