import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import { getNewsById } from '../../controllers/fetchFunctions';
import './News.css'


const NewsForm = () => {
	const [news, setNews] = useState([]);
	const [subject, setSubject] = useState('');
	const [content, setContent] = useState('');

	//fetch all news and set them to news state
	const getNews = async () => {
		await axios.get('api/news')
			.then(res => setNews(res.data))
			.catch(error => setNews('not connecting', error));
	};

	let history = useHistory();

	//handleSubmit function to add news
	const handleSubmit = async (event) => {
		event.preventDefault();
		await axios
			.post('api/news/add', { subject, content })
			.then(res => {
				setNews(news => [news])
				history.push('/news')
			})
			.catch(err => console.log('error', err));

		setSubject('');
		setContent('');
	};

	//delete function to remove wanted news
	const newsDelete = async (id) => {
		await axios
			.delete('api/news/delete', { data: { id } })
			.then(res => setNews((news) => [res.data, ...news]))
			.catch(err => console.log('newsDelete', err))
		getNews();
	};

	//update function that redirects to the NewsEditForm
	const updateNews = (id) => {
		history.push(`news/edit/${id}`)
	};

	useEffect(() => {
		return getNews();
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


					<br />

					{news.length > 0 ?
						<>
							{
								news.map((topic, i) => {
									return (
										<div className='news_content_innards' id={topic.id} key={i}>
											<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 10)}</h2> : <></>}</div>
											<div className='news_content_content'><p>{topic.content}</p></div>
											<button onClick={() => newsDelete(topic.id)}>Delete</button>
											<button onClick={() => updateNews(topic.id)}>Edit</button>
										</div>
									)
								})
							}
						</> : <div className='news_header'><p>No News</p></div>}
				</div>
			</div>
		</div >
	);
};


export default NewsForm;