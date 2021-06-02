import express from 'express';
import path from 'path';
import 'reflect-metadata';
import { createConnection, ConnectionOptions, getConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { createRoutes } from './routes/routes';
import { News } from './models/News';
import { Bio } from './models/Bio';
import { Users } from './models/Users';
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const router = express.Router();
const cors = require('cors');
const app = express();
const PORT: string | number = process.env.PORT || 5000;
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api', createRoutes());

if (process.env.NODE_ENV === 'development') {
	app.use(cors({
		origin: 'http://localhost:3000',
		credentials: true,
		methods: 'GET, PUT, POST, PATCH, DELETE'
	}));
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.use(cors({
		origin: 'process.env.DATABASE_URL',
		credentials: true,
		methods: 'GET, PUT, POST, PATCH, DELETE'
	}));
	// 'catching-all' handler to send back React's index.html if a req doesn't match any endpoints
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/../client/build/index.html'));
	});
}

const getOptions = async () => {
	let connectionOptions: ConnectionOptions;
	connectionOptions = {
		type: 'postgres',
		synchronize: false,
		logging: false,
		url: process.env.DATABASE_URL,
		cli: {
			entitiesDir: 'models'
		},
		extra: {
			ssl: { rejectUnauthorized: false }
		},
		entities: [News, Bio, Users]
	};
	if (process.env.DATABASE_URL) {
		Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
		app.use((req, res, next) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', '*');
			res.header(
				'Access-Control-Allow-Headers',
				'Origin, X-Requested-With, Content-Type, Accept'
			);
			next();
		});
		app.use('/api', createRoutes());
	}
	else {
		connectionOptions = await getConnectionOptions();
	}

	return connectionOptions;
};

const connectToDatabase = async (): Promise<void> => {
	const typeormconfig = await getOptions();
	await createConnection(typeormconfig);
};

connectToDatabase().then(async () => {
	console.log('Connected to database');
});



app.use('/', router);
app.get('/');
app.listen(PORT, () => console.log(`hosting port ${PORT}`));

// Nodemailer for Contact
const contactEmail = nodemailer.createTransport({
	host: String(process.env.CONTACT_HOST),
	port: Number(process.env.CONTACT_PORT),
	auth: {
		user: String(process.env.CONTACT_USER),
		pass: (process.env.CONTACT_PASS),
	},
	tls: {
		rejectUnauthorized: false
	}
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
		to: String(process.env.CONTACT_TO),
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

