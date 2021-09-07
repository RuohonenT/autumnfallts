import React, { useReducer, useRef } from 'react';
import formReducer from '../../../utils/formReducer';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../../firebase/firebase';
import '../Disco.css';
import axios from 'axios';

const DiscoForm = props => {
	const { file, url, setFile, setURL, initialFormStates } = props;
	const inputRef = useRef();


	const [formState, dispatch] = useReducer(formReducer, initialFormStates);

	const handleChange = e => {
		dispatch({
			type: 'handleInputChange',
			field: e.target.name,
			payload: e.target.value
		});
	};

	const addData = async (formState) => {
		await axios
			.post('api/disco/add', {
				albumtitle: formState.albumtitle,
				year: formState.year,
				tracktitles: formState.tracktitles,
				description: formState.description
			})
			.then(res => console.log(res.data.msg))
			// .then(res => { return setAllData({[res.data]), console.log(res.data) })
			.catch(err => console.log(err))
	};

	const submitTitle = e => {
		e.preventDefault();
		dispatch({
			type: 'handleTitleChange',
			name: inputRef.current.value,
		});
		inputRef.current.value = '';
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch({ type: 'handleTitleChange' });
		dispatch({ type: 'handleInputChange' });
		addData(formState);

		//firebase storage doesn't keep the order thus we create
		//newDate to rename the uploadable file in order to easily sort the images
		let date = new Date();
		let name = date.toLocaleString();
		const ref = storage.ref(`/images/covers/${name}`);
		const uploadTask = ref.put(file);
		uploadTask.on('state_changed', console.log('Uploading album art, please wait...'), console.error, () => {
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
			<label>Cover art: </label>
			<input type='file' onChange={e => setFile(e.target.files[0])} />
			<button type='submit' onClick={handleSubmit}>Tästä näin</button>
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