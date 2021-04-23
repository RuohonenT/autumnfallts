import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import { getNews } from '../../controllers/fetchFunctions';


const News = () => {
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchNews = async () => {
			axios.get('api/news')
				.then(async res => { setNews([res.data.sort((a, b) => { if (a.date > b.date) { return -1 } return -1 })]) })
				.catch(async error => setNews('not connecting', error));
		}
		fetchNews();
	}, [news])

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
					{news.map((topic, idx) => (
						<div key={idx}>
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