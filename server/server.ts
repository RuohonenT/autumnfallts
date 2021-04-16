import express from 'express';
import path from 'path';
import cors from 'cors';
const app = express()
const PORT: string | number = process.env.PORT || 5000;

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