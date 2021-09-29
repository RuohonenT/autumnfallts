import React, { useState } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import './Bio.css';
import axios from 'axios';

const BioUpdate = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const bio = location.state.params;
	const [header, setHeader] = useState(bio.header);
	const [content, setContent] = useState(bio.content);


	const handleSubmit = async (e, id, header, content) => {
		e.preventDefault();
		await axios
			.put('api/bio/edit/' + id, { header, content })
			.then(history.push('/bio'))
			.catch(err => console.log(err));
	};

	return (
		<div className='bio_content'>
			<div className='bio_content_innards'>
				<h1>Editoi historiaa täällä...</h1>
				<form className='bio_form'>
					<input
						className='header'
						type='text'
						id={'header'}
						value={header}
						name='header'
						onChange={e => setHeader(e.target.value)}
					/>
					<br />
					<textarea
						className='textarea'
						type='text'
						id={content}
						value={content}
						name='header'
						onChange={e => setContent(e.target.value)}
					/>
					<button onClick={e => handleSubmit(e, id, header, content)}>EDIT</button>
				</form>
				<br />

			</div >
		</div>
	)

}


export default BioUpdate;