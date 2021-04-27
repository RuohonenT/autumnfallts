import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { createConnection, ConnectionOptions, getConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { createRoutes } from './routes/routes';
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
const cors = require('cors')
const app = express()
const PORT: string | number = process.env.PORT || 5000;
dotenv.config();


if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	// 'catching-all' handler to send back React's index.html if a req doesn't match any endpoints above
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/../client/build/index.html'));
	});
}

if (process.env.NODE_ENV === 'development') {
	app.use(cors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: 'GET, PUT, POST, PATCH, DELETE'
	}));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', router);
app.use('/api', createRoutes());
app.get('/');
app.listen(PORT, () => console.log(`hosting port ${PORT}`));


const getOptions = async () => {
	let connectionOptions: ConnectionOptions;
	connectionOptions = {
		type: 'postgres',
		synchronize: false,
		logging: false,
		cli: {
			entitiesDir: 'models'
		},
		extra: {
			ssl: true, rejectUnauthorized: false
		},
		entities: ['models/*.*'],
	};
	if (process.env.DATABASE_URL) {
		Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
	}
	// else {
	// 	connectionOptions = await getConnectionOptions();
	// }

	return connectionOptions;
};

const connectToDatabase = async (): Promise<void> => {
	const typeormconfig = await getOptions();
	await createConnection(typeormconfig);
};

connectToDatabase().then(async () => {
	console.log('Connected to database');
});


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
		to: String(process.env.CONTANT_TO),
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
