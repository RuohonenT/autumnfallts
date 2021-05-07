import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { updateNews } from '../../controllers/fetchFunctions';
import './News.css'
const axios = require('axios');

const NewsEditForm = () => {
	const { id } = useParams();
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	const getNews = async () => {
		await axios.get('/api/news/' + id)
			.then(res => setNews(res.data))
			.catch(error => setNews('not connecting', error));
	};

	let history = useHistory();

	const handleSubmit = async (event, id, subject, content) => {
		event.preventDefault();
		const update = await updateNews(id, subject, content);
		if (update.status === 200) {
			console.log(update)
			history.push('/news');
		} else {
		}
	};

	useEffect(() => {
		return getNews();
	}, [setNews], [handleSubmit])

	return (
		<div className='news_container'>

			<div className='news_content'>

				<div className='news_content_innards'>
					<form>
						<input className='add_subject'
							type='text'
							id={subject}
							name='subject'
							value={news.subject}
							onChange={event => setSubject(event.target.value)}
						/>
					</form>
					<textarea className='add_content'
						type='text'
						id={content}
						name='content'
						value={news.content}
						onChange={event => setContent(event.target.value)}
					/>
					<button onClick={(event) => handleSubmit(event, id, subject, content)} > Edit</button>


					<br />

					{news.length > 0 ?
						<>
							{
								news.map((topic, i) => {
									return (
										<div className='news_content_innards' id={topic.id} key={i}>
											<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 10)}</h2> : <></>}</div>
											<div className='news_content_content'><p>{topic.content}</p></div>
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



export default NewsEditForm;