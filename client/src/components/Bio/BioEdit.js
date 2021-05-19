import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './Bio.css';

const BioEdit = props => {
	const { bio, setBio, content, setContent, header, setHeader } = props;
	const history = useHistory();

	const addBio = async (header, content) => {
		await axios
			.post('api/bio/add', { header, content })
			.then(res => {
				setContent([res.data, ...bio])
				console.log(res.status, content);
			})
			.catch(err => console.log(err));
		setHeader('');
		setContent('');
	};

	const editBio = (id, data) => {
		history.push(`bio/edit/${id}`, { params: { id, data } })
	};

	const deleteBio = async header => {
		axios
			.delete('api/bio/delete', { data: { header } })
			.then(res => setContent([res.data, ...bio]))
			.catch(err => console.log('bioDelete', err))
	};

	useEffect(() => {
		const getBio = async () => {
			await axios.get('/api/bio')
				.then(res => {
					setBio(res.data)
				})
				.catch(err => console.log(err));
		};

		return getBio();

	}, [setBio, content]);



	const handleSubmit = e => {
		e.preventDefault();
		if (content.length > 5) {
			addBio(header, content);

		} else { alert('More than 5 chars required!') }
	};

	return (
		<div className='bio_content_innards'>
			<form>
				<input
					type='text'
					id={header}
					name='header'
					value={bio.header}
					placeholder={bio.header}
					onChange={e => setHeader(e.target.value)}
				/>
				<br />
				<textarea
					type='text'
					id={content}
					name='content'
					value={content.bio}
					placeholder={bio.content}
					onChange={e => setContent(e.target.value)}
				/>
				<br />
				<button onClick={handleSubmit}>Add</button>

			</form>

			<>
				{bio.length > 0 ?
					<>
						{
							bio.map((bgraph, i) => {
								return (
									<div id={bgraph.header} key={i}>
										<div><p>{bgraph.header}</p></div>
										<div><p>{bgraph.content}</p></div>
										<button onClick={() => { editBio(bgraph.header, bgraph.content) }}>Edit</button>
										<button onClick={() => deleteBio(bgraph.header)}>Delete</button>
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