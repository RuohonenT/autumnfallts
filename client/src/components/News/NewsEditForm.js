import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { updateNews } from '../../controllers/fetchFunctions';
import './News.css'
const axios = require('axios');
const URL = process.env.DATABASE_URL;

const NewsEditForm = () => {
	const { id } = useParams();
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('3333333');
	const [content, setContent] = useState('cxvcxcv');

	useEffect(() => {
		const getNewsData = () => {
			axios.get(`${URL}/news/${id}`)
				.then(res => setNews(res.data))
		}
		return getNewsData();
	}, [setNews, id])


	let history = useHistory();

	const handleSubmit = async (event, subject, content) => {
		event.preventDefault();
		const update = await updateNews(subject, content);
		console.log(update.status);
		if (update.status === 200) {
			history.push('/news');
		} else {
		}

	};

	return (
		<div className='news_container'>

			<div className='news_content'>

				<div className='news_content_innards'>
					<form>
						<input className='add_subject'
							type='text'
							id={subject}
							placeholder={'subject'}
							name='subject'
							value={subject}
							onChange={event => setSubject(event.target.value)}
						/>
					</form>
					<textarea className='add_content'
						type='text'
						id={content}
						name='content'
						value={content}
						onChange={event => setContent(event.target.value)}
					/>
					<button onClick={handleSubmit}>Edit</button>


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