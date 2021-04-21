
import React, { useState, useEffect } from 'react';
import getNews from '../../controllers/fetchFunctions';
const axios = require('axios');
const URL = process.env.DB_URL || 'http://localhost:5000/api';
// import NotFound from '../NotFound/NotFound';

const News = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		async function getNews() {
			try {
				const response = await axios.get(`${URL}/news`);
				console.log(response);
			} catch (error) {
				console.error(error);
			}

		}
		getNews();
	}, []);


	return (
		<div className='news_container'>

			<div className="news_content">
				<div>
					{news}
				</div>
			</div>

		</div>
	)
}

export default News;