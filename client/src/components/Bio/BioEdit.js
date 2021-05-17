import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Bio.css';

const BioEdit = props => {
	const { bio, content, setContent, id } = props;

	const addBio = async (content) => {
		await axios
			.post('api/bio/add', { content })
			.then(res => {
				setContent([res.data])
			})
			.catch(err => console.log(err));
	};

	const editBio = e => {
		e.preventDefault();
	};

	const handleSubmit = e => {
		e.preventDefault();
		addBio(content);
	};

	return (
		<div className='bio_content_innards'>
			<form>
				<input
					type='text'
					id={content}
					name='content'
					value={content.content}
					onChange={e => setContent(e.target.value)}
				/>
				<button onClick={handleSubmit}>Add</button>
				<button onClick={editBio}>Edit</button>
			</form>

			<>
				{bio.length > 0 ?
					<>
						{
							bio.map((cont, i) => {
								return (
									<div id={cont.content} key={i}>
										<div><p>{cont.content}</p></div>
									</div>
								)
							})
						}
					</>
					: <div><p>No Bio Found</p></div>}
			</ >
		</div>
	)
};

export default BioEdit;