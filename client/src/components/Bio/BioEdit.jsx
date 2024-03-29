import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Bio.css';

const BioEdit = props => {
	const { bio, content, setContent, header, setHeader } = props;
	const history = useHistory();

	//addBio function to add new bio
	const addBio = async (header, content) => {
		await axios
			.post('api/bio/add', { header, content })
			.then(res => setContent([res.data]))
			.catch(err => console.log(err))

		setHeader('');
		setContent('');
	};

	const editBio = (id, header, content) => {
		history.push('bio/edit/' + id, { params: { header, content } })
	};

	const deleteBio = async id => {
		await axios
			.delete('api/bio/delete', { data: { id } })
			.then(res => setContent([res.data]))
			.catch(err => console.log('bioDelete', err))
	};


	const handleSubmit = e => {
		e.preventDefault();
		if (content.length > 5) {
			addBio(header, content);

		} else { alert('More than 5 chars required!') }
	};

	return (
		<div className='bio_content_innards'>
			<h1>Biography...</h1>
			<form className='bio_form'>
				<input
					className='add_subject'
					type='text'
					id={header}
					name='header'
					value={header}
					placeholder='Add header'
					onChange={e => setHeader(e.target.value)}
				/>
				<br />
				<textarea
					type='text'
					id={content}
					name='content'
					value={content}
					placeholder='Add content'
					onChange={e => setContent(e.target.value)}
				/>
				<br />
				<button onClick={handleSubmit}>Add</button>

			</form>

			<>
				{bio !== undefined && bio.length > 0 ?
					<>
						{
							bio.map((bgraph, i) => {
								return (
									<div id={bgraph.id} key={i}>
										<div><p>{bgraph.header}</p></div>
										<div><p>{bgraph.content}</p></div>
										<div className='modify'>
											<button className='editremove' onClick={() => editBio(bgraph.id, bgraph.header, bgraph.content)}>EDIT</button>
											<p> | </p>
											<button className='editremove' onClick={() => deleteBio(bgraph.id)}>REMOVE</button>
										</div>
									</div>
								)
							})
						}
					</>
					: <div className='bio_content_innards'><p>No Bio Found</p></div>}
			</ >
		</div>
	)
};

export default BioEdit;