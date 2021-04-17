import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import getNews from '../../controllers/fetchFunctions';
const URL = process.env.DATABASE_URL || 'http://localhost:5000/api';
// import NotFound from '../NotFound/NotFound';

const News = () => {
	const [news, setNews] = useState();

	useEffect(() => {
		axios.get(`${URL}/news`)
			.then((response) => {
				console.log(response);
				setNews(response)
			})
			.catch((error) => {
				console.log('erroria', error);
				setNews('ei yhdistä')
			})
	}, [news]);


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