const URL = process.env.DATABASE_URL || 'http://localhost:5000/api';
const axios = require('axios');

export const getNews = async () => {
	try {
		const response = await axios.get(`${URL}/news`);
		console.log(response.data);
	} catch (error) {
		console.error('fetchFunctions error', error);
	}
};

export const deleteNews = async (id) => {
	const result = await deleteNews(id);
	if (result.status === 200) {
		getNews();
	}
};