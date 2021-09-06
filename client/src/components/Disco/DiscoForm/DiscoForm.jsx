import React, { useReducer, useRef, useState } from 'react';
import formReducer from '../../../utils/formReducer';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../firebase/firebase';
import '../Disco.css';

const DiscoForm = () => {
	const [file, setFile] = useState(null);
	const [url, setURL] = useState()
	const inputRef = useRef();
	const initialFormStates = {
		albumtitle: '',
		year: '',
		description: '',
		tracktitles: []
	};

	const [formState, dispatch] = useReducer(formReducer, initialFormStates);

	const handleChange = e => {
		dispatch({
			type: 'handleInputChange',
			field: e.target.name,
			payload: e.target.value
		});
	};

	const submitTitle = e => {
		e.preventDefault();
		dispatch({
			type: 'handleTitleChange',
			name: inputRef.current.value,
		});
		inputRef.current.value = '';
		console.log(formState)
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch({ type: 'handleTitleChange' });
		dispatch({ type: 'handleInputChange' });

		//firebase storage doesn't keep the order thus we create
		//newDate to rename the uploadable file in order to easily sort the images
		let date = new Date();
		let name = date.toLocaleString();
		const ref = storage.ref(`/images/covers/${name}`);
		const uploadTask = ref.put(file);
		uploadTask.on('state_changed', console.log('Uploading album art, please wait!'), console.error, () => {
			ref.getDownloadURL()
				.then(url => {
					setURL(url);
					setFile(null);
					console.log('Album cover uploaded!')
				})
				.catch(err => console.log(err));
			console.log('handleSubmit', formState)
		});
	}


	return (<>
		<form>
			<label>Album title:</label>
			<input
				type='text'
				name='albumtitle'
				value={formState.albumtitle}
				onChange={handleChange}
			/>
			<input
				type='text'
				name='year'
				value={formState.year}
				onChange={handleChange}
			/>
			<input
				type='text'
				name='description'
				value={formState.description}
				onChange={handleChange}
			/>
			<button disabled={!file} type='submit' onClick={handleSubmit}>Tästä näin</button>
		</form>

		<form onSubmit={submitTitle}>
			<label>Titles:</label>
			<input ref={inputRef} />
			{/* <input
				type='text'
				name='tracktitles'
				// value={formState.tracktitles}
				onChange={e => dispatch({ type: 'handleTitleChange', field: e.target.name, payload: e.target.value })}
			/> */}
		</form>
		<ol>
			{Object.values(formState.tracktitles).map(e => <li key={e.id}>{e.name}</li>)}
		</ol>
	</>);
};

export default DiscoForm;