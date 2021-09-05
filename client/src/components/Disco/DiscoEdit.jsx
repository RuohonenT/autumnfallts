import React, { useState, useRef, useReducer } from 'react';
import { storage } from '../../firebase/firebase';
import axios from 'axios';

const DiscoEdit = props => {
	//states for data upload (heroku)
	const { data, albumtitle, description, dispatch, addTitle, inputRef, tracktitle, year, setAlbumtitle, setDescription, setYear, setData } = props;
	//states for image upload (firebase)
	const [file, setFile] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [url, setURL] = useState('');
	// const [tracknumber, setTracknumber] = useState([]);
	// const [title, setTitle] = useState('');


	const validation = (albumtitle, year, tracktitle, description) => {
		return {
			albumtitle: albumtitle.length === 0,
			year: year.length < 4 || year.length > 4 || isNaN(year),
			tracktitle: tracktitle.length === 0,
			description: description.length === 0
		};
	};

	const errors = validation(albumtitle, year, tracktitle, description);
	const isEnabled = !Object.keys(errors).some(x => errors[x]);

	//upload album data to heroku database
	const addAlbumData = async (albumtitle, year, tracktitle, description) => {
		await axios
			.post('api/disco/add', { albumtitle, year, tracktitle, description })
			.then(res => {
				setData([res.data]);
				console.log(res.data.msg);
				setAlbumtitle([]);
				// setTracktitle([]);
				setYear([]);
				setDescription([]);
			})
			.catch(err => console.log(err, data.data.msg));
	};

	//upload image to firebase
	const handleImageSubmit = e => {
		e.preventDefault();
		addAlbumData(albumtitle, year, tracktitle, description);
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
		});
	};


	return (
		<div className='disco_content_innards'>
			<form className='disco_form' onSubmit={handleImageSubmit}>
				<label>Album title:</label>
				<input
					type='text'
					id={albumtitle}
					name='albumtitle'
					value={albumtitle}
					placeholder='Untitled album'
					className={errors.albumtitle ? 'error' : ''}
					onChange={e => setAlbumtitle(e.target.value)}
				/>

				<label>Release year:</label>
				<input
					type='text'
					id={year}
					name='year'
					value={year}
					placeholder='Year'
					className={errors.year ? 'error' : ''}
					onChange={e => setYear(e.target.value)}
				/>

				<label>Additional info:</label>
				<textarea
					type='text'
					id={description}
					name='description'
					value={description}
					placeholder='Album description'
					className={errors.description ? 'error' : ''}
					onChange={e => setDescription(e.target.value)}
				/>


				<label>Cover art:</label>
				<input
					type='file'
					onChange={e => setFile(e.target.files[0])}
				/>


				<button disabled={!file || !isEnabled}>Upload album</button>

			</form>

			<form className='disco_form' onSubmit={addTitle}>
				<input ref={inputRef} onSubmit={addTitle} />
			</form>
			<ol>
				{tracktitle.map((item, index) => {
					return <li key={item.id}>
						{item.name}
					</li>
				})}
			</ol>

			{/* <img src={url} alt='' /> */}

			<br />

			{/* <div className='disco_content_innards'>

				<div className='disco_covers'>
					{
						covers.map((url, idx) => {
							return <img className='disco_cover' key={idx} src={url} alt=''></img>
						})
					}

				</div>
				<div className='disco_details'>
					{(data !== undefined) && (data.length > 0) ?
						<>
							{
								data.map((details, i) => {
									return (
										<div id={details.albumtitle} key={i}>
											<div><p>{details.albumtitle}</p></div>
											<div><p>{details.year}</p></div>
											<div><p>{details.tracktitle}</p></div>
											<div><p>{details.description}</p></div>
										</div>
									)
								})}
						</>

						:

						<div><p>Loading data...</p></div>
					}

				</div>
			</div> */}

		</div>
	);
};

export default DiscoEdit;