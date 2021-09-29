import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useAppContext } from '../../../Context';
import { uploadCoverToFirebase } from '../../../utils/functions';
import './DiscoAdd.css';

Modal.setAppElement('#root');

const DiscoAdd = props => {
	const { addData, file, setFile, formState, inputRef, dispatch, setState } = props;
	const { modalIsOpen, setIsOpen } = useAppContext();
	const [isEnabled, setIsEnabled] = useState(false);

	//event handler to fire dispatch when one of the initialFormStates values are being changed
	const handleChange = e => {
		dispatch({
			type: 'handleInputChange',
			field: e.target.name,
			name: { value: e.target.value, hasError: false }
		})
	};

	//event handler to fire dispatch when a new track title is being added
	const handleTitleChange = e => {
		e.preventDefault();
		dispatch({
			type: 'addTitle',
			name: inputRef.current.value,
		});
		inputRef.current.value = '';
	};

	//executing addData function, firing dispatch to clear values, and uploading image to firebase...
	const handleSubmit = async e => {
		e.preventDefault();
		await addData(formState);
		setState('adding new data');
		dispatch({ type: 'clear' });
		file !== null ?
			//if file has been selected we can execute the uploadCover function
			await uploadCoverToFirebase(file)
				.then(() => {
					setFile(null);
					console.log('Album cover uploaded!')
					setIsOpen(true);
				})
				.catch(err => console.log(err))

			:

			alert('Include the image!')
	};

	//checking for 'hasErrors' by forEaching through each field...
	useEffect(() => {
		Object.values(formState).forEach(state =>
			state.hasError !== false && formState.hasError !== false ?
				setIsEnabled(false) : setIsEnabled(true)
		)

	}, [formState]);


	return (
		<div className='content'>

			<Modal
				isOpen={modalIsOpen}
				className="modal"
				setIsOpen={setIsOpen}>
				Success!
				Album data added! Do you wish to continue to page Discography or add another album?
				<Link to='/disco'>Continue</Link>
				<button onClick={() => setIsOpen(false)}>STAY</button>
			</Modal>


			<h1>Add a record...</h1>

			<div className='forms'>
				<form className='form'>
					<label>Album title:</label>
					<input
						type='text'
						name='albumtitle'
						placeholder='album title'
						value={formState.albumtitle.value}
						className={formState.albumtitle.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Release year:</label>
					<input
						type='number'
						name='year'
						placeholder='year'
						value={formState.year.value}
						className={formState.year.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Additional info:</label>
					<textarea
						type='text'
						name='description'
						placeholder='description'
						value={formState.description.value}
						className={formState.description.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Cover art: </label>
					<input
						type='file'
						className={!file ? 'error' : ''}
						onChange={e => setFile(e.target.files[0])} />
				</form>

				<form onSubmit={handleTitleChange} className='form'>
					<label>Titles:</label>
					<input
						ref={inputRef}
						type='text'
						placeholder='add tracktitle'
						className={formState.hasError ? 'error' : ''}
					/>
				</form>
				<button disabled={file || !isEnabled} type='submit' onClick={handleSubmit}>Tästä näin</button>
				<ol>
					{formState.tracktitles.map((title, idx) =>
						<li key={title.id}>
							{title.name}
							<button onClick={() => dispatch({ type: 'removeTitle', idx })}>x</button>
						</li>
					)}
				</ol>
			</div>

		</div>

	)
};

export default DiscoAdd;