import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Bio.css';

const BioEdit = props => {
	const { setBio, addBio } = props;
	const [content, setContent] = useState('');

	useEffect(() => {
		const getBio = async () => {
			await axios.get('api/bio')
				.then(res => {
					setBio(res.data)
				})
				.catch(err => console.log(err))
		};
		return getBio();
	}, [setBio, addBio]);

	const handleSubmit = event => {
		event.preventDefault();
		addBio(content);
	};

	return (
		<div className='bio_content_innards'>
			<form>
				<input
					type='text'
					id={content}
					name='content'
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<button onClick={handleSubmit}>Add</button>
			</form>
		</div>
	)
};

export default BioEdit;