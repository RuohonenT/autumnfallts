import axios from 'axios';
import React, { useState, useEffect } from 'react';
import getNews from '../../controllers/fetchFunctions';
// const axios = require('axios');
const URL = process.env.DB_URL || 'http://localhost:5000/api';
// import NotFound from '../NotFound/NotFound';

const News = () => {
	const [news, setNews] = useState([]);
	useEffect(() => {
		axios.get('api/news')
			.then((response) => {
				setNews([response.data[0]])
				// console.log(response.data[0]);
			})
			.catch((error) => {
				console.log('erroria', error);
				setNews('ei yhdistä')
			})
		getNews();
	}, []);


	return (
		<div className='news_container'>

			<div className="news_content">
				<div>
					{news.map(el => el.content)}
				</div>
			</div>

		</div>
	)
}

export default News;