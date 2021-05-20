import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './News.css'


const NewsEdit = props => {
	const { news, subject, content, setNews, setSubject, setContent } = props;
	const history = useHistory();

	// function to add news
	const handleSubmit = async event => {
		event.preventDefault();
		if (content.length > 5) {
			await axios
				.post('api/news/add', { subject, content })
				.then(res => {
					setNews(news => [res.data, ...news])
					console.log(res.status, res.data)
				})
				.catch(err => console.log('error', err));
		} else { alert('More than 5 chars required!') }

		setSubject('');
		setContent('');
	};

	//function that directs us to the NewsEditFormat component w/ id
	const editNews = (id, subject, content) => {
		history.push('news/edit/' + id, { params: { subject, content } })
	};

	//delete function to remove wanted news
	const newsDelete = async id => {
		await axios
			.delete('api/news/delete', { data: { id } })
			.then(res => setContent([res.data, ...news]))
			.catch(err => console.log('newsDelete', err))
	};

	//fetch all news and set them to news state
	useEffect(() => {
		const getNews = async () => {
			await axios.get('api/news')
				.then(res => setNews(res.data))
				.catch(error => setNews('not connecting', error));
		};
		return getNews();

	}, [setNews, content])


	return (
		<div className='news_content_innards'>
			<h1>Lisää uutinen</h1>
			<form className='news_form'>
				<input className='add_subject'
					placeholder='Add subject'
					id={'subject'}
					name='subject'
					type='text'
					value={news.subject}
					onChange={event => setSubject(event.target.value)}
				/>
				<br />
				<textarea className='add_content'
					placeholder='Add content'
					id={'content'}
					name='content'
					type='text'
					value={news.content}
					onChange={event => setContent(event.target.value)}
				/>
				<button onClick={(event) => handleSubmit(event, subject, content)}>Lisää</button>
			</form>

			<br />

			{news.length > 0 ?
				<>
					{
						news.map((topic, i) => {
							return (
								<div className='news_content_innards' id={topic.id} key={i}>
									<div className='news_header'><h1>{topic.subject}</h1>{topic.date !== undefined ? <h2>{topic.date.slice(0, 10)}</h2> : <></>}</div>
									<div className='news_content_content'><p>{topic.content}</p></div>
									<><button className='editremove' onClick={() => editNews(topic.id, topic.subject, topic.content)}>EDIT</button>
										<button className='editremove' onClick={() => newsDelete(topic.id)}>DELETE</button></>
								</div>
							)
						})
					}
				</> : <div className='news_content_innards'><p>No News</p></div>}
		</div >
	);
};


export default NewsEdit;