const URL = process.env.DATABASE_URL || 'http://localhost:5000/';
const axios = require('axios');

export default async function getNews() {
	try {
		const response = await axios.get(`${URL}/news`);
		console.log(response.data);
	} catch (error) {
		console.error('fetchFunctions error', error);
	}
}