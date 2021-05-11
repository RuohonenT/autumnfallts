import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsForm from './NewsForm';
import NewsEditForm from './NewsEditForm';
import './News.css'
import UnderConstruction from '../under';
const axios = require('axios');


const News = () => {
	const [news, setNews] = useState([]);

	useEffect(() => {
		const getNews = () => {
			axios.get('api/news')
				.then(res => setNews(res.data))
				.catch(error => setNews('not connecting', error));
		};

		return getNews();
	}, [setNews]);

	return (
		<div className='news_container'>

			<div className='news_content'>
				<div className='news_content_innards'>
					<><UnderConstruction /></>
					<>
						<Link to="/NewsForm">Add a new item</Link>
					</>
					{news.length > 0 ?
						<>
							{
								news.map((topic, i) => {
									return (
										<div className='news_content_innards' id={topic.id} key={i}>
											<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 9)}</h2> : <></>}</div>
											<div><p>{topic.content}</p></div>
											<>
												<Link to={<NewsForm setNews={setNews} />}>EDIT</Link>
											</>

										</div>
									)
								})
							}
						</> : <div className='news_header'><p>No News</p></div>}
				</div>
			</div>
		</div >
	)
};



// useEffect(() => {
// 	const arrangedData = [...data].sort((a, b) => { if (a.id > b.id) { return -1 } return -1 });
// 	setNews(arrangedData);
// }, [arrangedData])
export default News;