import React, { useState, useEffect } from 'react';
import NewsEdit from './NewsEdit';
import { useAppContext } from '../../Context';
import axios from 'axios';
import './News.css'

function News() {
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState([]);
	const [content, setContent] = useState([]);
	const { token } = useAppContext();

	//fetch all news and set them to news state
	useEffect(() => {
		async function getNews() {
			await axios.get('api/news')
				.then(res => {
					let news = res.data;
					setNews(news);
				})
				.catch(err => {
					console.log(err)
					setNews(['No news found.'])
				});
		};
		return getNews();

	}, [content])

	return (
		// <div className='news_container'>
		<>
			{token ?
				<>
					<NewsEdit
						news={news}
						setNews={setNews}
						content={content}
						setContent={setContent}
						subject={subject}
						setSubject={setSubject} />
				</>
				:
				<div className='news_content'>

					{news.length > 0 ?
						<>
							{
								news.map((topic, i) => {
									return (
										<div className='news_content_innards' id={topic.id} key={i}>
											<h1>{topic.subject}</h1>
											<p>{topic.content}</p>
											<h6>{topic.date !== undefined ? <>{topic.date.slice(0, 10)}</> : <></>}</h6>
										</div>
									)
								})
							}
						</> : <div className='news_content_innards'><p>Loading news...</p></div>}
				</div>
			}

		</>
		// </div >
	)
};

export default News;