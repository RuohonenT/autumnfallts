import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './News.css'
// import { getNews } from '../../controllers/fetchFunctions';


const News = () => {
	const [data, setData] = useState([]);
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		const fetchNews = () => {
			axios.get('api/news')
				.then(res => setData(res.data))
				.catch(error => setData('not connecting', error));

			const arrangedData = [...data].sort((a, b) => { if (a.id > b.id) { return -1 } return -1 });
			setNews(arrangedData);
			console.log()
		};

		fetchNews();
	}, [data])


	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post('api/news/post', { subject, content })
			.then(res => setNews([res.data]))
			.catch(err => console.log('error', err));
	};

	return (
		<div className='news_container'>

			<div className='news_content'>
				<p>Uutiset</p>

			</div>
		</div >
	)
}

export default News;