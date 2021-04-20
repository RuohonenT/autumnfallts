import React, { useState, useEffect } from 'react';
import getNews from '../../controllers/fetchFunctions';
// const URL = process.env.DATABASE_URL;
// import NotFound from '../NotFound/NotFound';

const News = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		getNews();
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