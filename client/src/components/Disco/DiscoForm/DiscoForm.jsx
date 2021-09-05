import React, { useReducer, useRef, useState } from 'react';
import formReducer from '../../../utils/formReducer';
import { storage } from '../../../firebase/firebase';
import '../Disco.css';

const DiscoForm = () => {
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
			// field: e.target.name,
			// payload: e.target.value
		})
		// console.log(formState)
	};

	return (<>
		<form>
			<label>Album title:</label>
			<input
				type='text'
				name='albumtitle'
				value={formState.albumtitle}
				onChange={handleChange}
			/>
		</form>

		<form onSubmit={submitTitle}>
			<label>Titles:</label>
			<input
				type='text'
				name='tracktitles'
				// value={formState.tracktitles}
				onChange={e => dispatch({ type: 'handleTitleChange', field: e.target.name, payload: e.target.value })}
			/>
		</form>
		<ol>
			{Object.entries(formState.tracktitles).map(e => <li>{e}</li>)}
		</ol>
	</>);
};

export default DiscoForm;
//firebase storage doesn't keep the order thus we create
//newDate to rename the uploadable file in order to easily sort the images
// let date = new Date();
// let name = date.toLocaleString();
// const ref = storage.ref(`/images/covers/${name}`);
// const uploadTask = ref.put(file);
// uploadTask.on('state_changed', console.log('Uploading album art, please wait!'), console.error, () => {
// 	ref.getDownloadURL()
// 		.then(url => {
// 			setURL(url);
// 			setFile(null);
// 			console.log('Album cover uploaded!')
// 		})
// 		.catch(err => console.log(err));
// });
// }