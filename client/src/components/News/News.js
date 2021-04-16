import axios from 'axios';
import React, { useState, useEffect } from 'react';
import getNews from '../../controllers/fetchFunctions';
const URL = process.env.DB_URL || 'http://localhost:5000/api';
// import NotFound from '../NotFound/NotFound';

const News = () => {
	const [news, setNews] = useState();

	const getNewsList = async () => {
		const result = await getNews();
		console.log(result);
		setNews(result);
		console.log(news);

		// axios.get(`${URL}/news`)
		// 	.then((response) => {
		// 		console.log(response);
		// 		setNews(response)
		// 	})
		// 	.catch((error) => {
		// 		console.log(error);
		// 		setNews('erroria', error)
		// 	})

	};


	useEffect(() => {
		getNewsList();
	}, []);


	return (
		<div className='news_container'>

			<div className="news_content">
				<div>
					{/* {news.map(news => news._content)} */}
				</div>
			</div>

		</div>
	)
}

export default News;