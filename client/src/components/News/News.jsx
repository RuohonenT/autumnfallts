import React, { useState, useEffect } from 'react';
import NewsEdit from './NewsEdit';
import { useAppContext } from '../../Context';
import './News.css'
import axios from 'axios';

function News() {
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState([]);
	const [content, setContent] = useState([]);
	const { token } = useAppContext();

	//fetch all news and set them to news state
	useEffect(() => {
		async function getNews() {
			const res = await axios.get('api/news');
			const data = await res.data;
			const sortedData = data.sort((a, b) => { if (a.date > b.date) { return -1 } else { return null } });
			setNews(sortedData);
		};
		return getNews();

	}, [setNews, content])

	return (
		<div className='news_container'>
			<div className='news_content'>
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
					<div className='news_content_innards'>

						{news.length > 0 ?
							<>
								{
									news.map((topic, i) => {
										return (
											<div className='news_content_innards' id={topic.id} key={i}>
												<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 10)}</h2> : <></>}</div>
												<div><p>{topic.content}</p></div>
											</div>
										)
									})
								}
							</> : <div className='news_content_innards'><p>No News Found</p></div>}
					</div>
				}

			</div>
		</div >
	)
};

export default News;