const URL = process.env.DATABASE_URL || 'http://localhost:5000/api';
const axios = require('axios');

export async function getNews() {
	try {
		const response = await axios.get(`${URL}/news`);
		console.log(response.data);
	} catch (error) {
		console.error('fetchFunctions error', error);
	}
};

// export async function addNews(subject, content) {
// 	try {
// 		await axios.post(`${URL}/news/add`, { subject, content });
// 	} catch (error) {
// 		console.error('addNews error', error);
// 	}
// }