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

// const deleteNews = async (id) => {
// 	if (token) {
// 		const result = await deleteProductFromCart(cart_id, token);
// 		if (result.status === 200) {
// 			getProducts()
// 		}
// 	}
// }