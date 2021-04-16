const URL = process.env.DB_URL || 'http://localhost:5000/api';
const axios = require('axios');

export default async function getNews() {
	try {
		const response = await axios.get(`${URL}/news`);
		console.log(response.data);
	} catch (error) {
		console.error('fetchFunctions error', error);
	}
}
// 	// console.log(`${URL}/news`);
// 	return axios.get(`${URL}/news`, {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		},
// 		mode: 'cors',
// 		credentials: "include",
// 		body: JSON.stringify({ book_id })
// 	});
// };