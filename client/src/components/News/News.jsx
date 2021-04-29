import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './News.css'

const News = () => {
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	const getNews = () => {
		axios.get('api/news')
			.then(res => setNews(res.data))
			.catch(error => setNews('not connecting', error));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios
			.post('api/news/add', { subject, content })
			.then(res => setNews((news) => [res.data, ...news]))
			.catch(err => console.log('error', err));

		getNews()
		setSubject('');
		setContent('');
	};

	const newsDelete = async (id) => {
		await axios
			.delete('api/news/delete', { data: { id } })
			.then(res => setNews((news) => [res.data, ...news]))
			.catch(err => console.log('newsDelete', err))
		getNews();
	};

	useEffect(() => {
		getNews();
	}, [setNews], [handleSubmit], [newsDelete])

	return (
		<div className='news_container'>

			<div className='news_content'>

				<div className='news_content_innards'>
					<input className='add_subject'
						placeholder='Add subject'
						id={'subject'}
						name='subject'
						type='text'
						value={subject}
						onChange={event => setSubject(event.target.value)}
					/>
					<textarea className='add_content'
						placeholder='Add content'
						id={'content'}
						name='content'
						type='text'
						value={content}
						onChange={event => setContent(event.target.value)}
					/>
					<button onClick={(event) => handleSubmit(event, subject, content)}>Lisää</button>
					<div className='break' />
					{news.length > 0 ?
						<>
							{
								news.map((topic, i) => {
									return (
										<div className='news_content_innards' id={topic.id} key={i}>
											<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 10)}</h2> : <></>}</div>
											<div className='news_content_content'><p>{topic.content}</p></div>
											<button onClick={() => newsDelete(topic.id)}>Delete</button>
										</div>
									)
								})
							}
						</> : <div className='news_header'><p>No News</p></div>};
				</div>
			</div>
		</div >
	)



	// useEffect(() => {
	// 	const arrangedData = [...data].sort((a, b) => { if (a.id > b.id) { return -1 } return -1 });
	// 	setNews(arrangedData);
	// }, [arrangedData])

}
export default News;