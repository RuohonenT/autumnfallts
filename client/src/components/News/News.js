import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './News.css'
import { deleteNews } from '../../controllers/fetchFunctions';


const News = (props) => {
	const [data, setData] = useState([]);
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	const getNews = () => {
		axios.get('api/news')
			.then(res => setNews(res.data))
			.catch(error => setNews('not connecting', error));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('api/news/add', { subject, content })
			.then(res => setNews((news) => [res.data, ...news]))
			.catch(err => console.log('error', err));

		setSubject('');
		setContent('');
		getNews()
	};

	useEffect(() => {
		getNews();
	}, [setNews])



	const newsDelete = async (id) => {
		const result = await deleteNews(id);
		console.log(result)
	};


	return (
		<div className='news_container'>

			<div className='news_content'>

				{news.map((topic, i) => (
					<div id={topic.id} key={i}>
						<div className='news_header'><h1>{topic.subject}</h1></div>
						<div><h1>{topic.date}</h1></div>
						<div><p>{topic.content}</p></div>
						<button onClick={() => newsDelete(topic.id)}>Delete</button>
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
	)



	// useEffect(() => {
	// 	const arrangedData = [...data].sort((a, b) => { if (a.id > b.id) { return -1 } return -1 });
	// 	setNews(arrangedData);
	// }, [arrangedData])

}
export default News;