import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { updateNews } from '../../utils/functions';
import './News.css'

const NewsUpdate = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const news = location.state.params;
	const [subject, setSubject] = useState(news.subject);
	const [content, setContent] = useState(news.content);

	const handleSubmit = async (event, id, subject, content) => {
		event.preventDefault();
		const update = await updateNews(id, subject, content);
		if (update.status === 200) {
			console.log(update)
			history.push('/news');
		} else {
			console.log('failing');
		}
	};


	return (
		<div className='news_content'>
			<div className='news_content_innards'>
				<h1>Editoi Uutisia täällä...</h1>
				<form className='news_form'>
					<input
						className='add_subject'
						type='text'
						id={'subject'}
						name='subject'
						value={subject}
						onChange={event => setSubject(event.target.value)}
					/>
					<br />
					<textarea
						className='add_content'
						type='text'
						id={'content'}
						name='content'
						value={content}
						onChange={event => setContent(event.target.value)}
					/>
					<button onClick={(event) => handleSubmit(event, id, subject, content)} > Edit</button>
				</form>

			</div>
		</div>

	)
};



export default NewsUpdate;