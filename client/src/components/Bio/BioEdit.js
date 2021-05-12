import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Bio.css';

const BioEdit = ({ bio, setBio, deleteBio }) => {
	const [content, setContent] = useState([]);

	let history = useHistory();

	useEffect(() => {
		const getBio = async () => {
			await axios.get('api/bio')
				.then(res => {
					setBio(res.data)
				})
				.catch(err => console.log(err))
		};
		return getBio();
	}, [setBio], []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post('api/bio/add', { content })
			.then(res => {
				setBio(...bio, res.data)
				history.push('/bio');
			})
			.catch(err => console.log(err));
	};

	const removeBio = () => {
		deleteBio(content);
	};

	return (
		<div className='bio_content_innards'>
			<form>
				<>{bio}</>
				<input
					type='text'
					id={content}
					name='content'
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<button onClick={handleSubmit}>Add</button>
				<button onClick={removeBio}>Delete</button>
			</form>
		</div>
	)
};

export default BioEdit;