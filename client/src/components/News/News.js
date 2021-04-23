import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { getNews } from '../../controllers/fetchFunctions';


const News = () => {
	const [data, setData] = useState([]);
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchNews = async () => {
			axios.get('api/news')
				.then(async res => setData(res.data))
				.catch(async error => setData('not connecting', error));

			const arrangedData = [...data].sort((a, b) => { if (a.id > b.id) { return -1 } return -1 });
			setNews(arrangedData);
			console.log()
		};

		fetchNews();
	}, [data])


	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('api/news/add', { subject, content })
			.then(res => setNews([res.data]))
			.catch(err => console.log('error', err));
	};

	return (
		<div className='news_container'>

			<div className="news_content">
				<div className='news_content'>
					{news.map((topic, i) => (
						<div id={topic.id} key={i}>
							<div><h1>{topic.subject}</h1></div>
							<div><h1>{topic.date}</h1></div>
							<div><p>{topic.content}</p></div>
						</div>
					))}
					<input
						placeholder='Add subject'
						id={'subject'}
						name='subject'
						type='text'
						value={subject}
						onChange={event => setSubject(event.target.value)}
					/>
					<input
						placeholder='Add content'
						id={'content'}
						name='content'
						type='text'
						value={content}
						onChange={event => setContent(event.target.value)}
					/>
					<button onClick={(event) => handleSubmit(event, subject, content)}>Lissää</button>
				</div>
			</div >
		</div>
	)
}

export default News;