import React, { useState } from 'react';
import { storage } from '../../firebase/firebase';
import axios from 'axios';

const DiscoEdit = props => {
	//states for data upload (heroku)
	const { covers, data, setData, albumtitle, tracktitle, description, setTracktitle, setAlbumtitle, setDescription } = props;
	// const [albumtitle, setAlbumtitle] = useState([]);
	// const [tracktitle, setTracktitle] = useState([]);
	// const [description, setDescription] = useState([]);
	//states for image upload (firebase)
	const [file, setFile] = useState(null);
	const [url, setURL] = useState('');

	//upload album data to database
	const addAlbumData = async (albumtitle, tracktitle, description) => {
		await axios
			.post('api/disco/add', { albumtitle, tracktitle, description })
			.then(res => setData([res.data]))
			.catch(err => console.log(err));
	};

	//upload image to firebase
	const handleImageSubmit = e => {
		e.preventDefault();
		const ref = storage.ref(`/images/covers/${file.name}`);
		const uploadTask = ref.put(file);
		uploadTask.on('state_changed', console.log, console.error, () => {
			ref
				.getDownloadURL()
				.then((url) => {
					setFile(null);
					setURL(url);
				});
		});
	};

	const handleDataSubmit = e => {
		e.preventDefault();
		addAlbumData(albumtitle, tracktitle, description);
	};



	return (
		<div>
			<form>
				<input
					type='text'
					id={albumtitle}
					name='albumtitle'
					value={albumtitle}
					placeholder='Untitled album'
					onChange={e => setAlbumtitle(e.target.value)}
				/>
				<input
					type='text'
					id={tracktitle}
					name='tracktitle'
					value={tracktitle}
					placeholder='Track title'
					onChange={e => setTracktitle(e.target.value)}
				/>
				<input
					type='text'
					id={description}
					name='description'
					value={description}
					placeholder='Album description'
					onChange={e => setDescription(e.target.value)}
				/>
				<button onClick={handleDataSubmit}>Upload Data</button>
			</form>

			<form onSubmit={handleImageSubmit}>
				<input type='file' onChange={e => setFile(e.target.files[0])} />
				<button disabled={!file}>upload to firebase</button>
			</form>
			<img src={url} alt='' />

			<br />

			<div className='disco_content_innards'>

				<div className='disco_covers'>
					{
						covers.map((url, idx) => {
							return <img className='disco_cover' key={idx} src={url} alt=''></img>
						})
					}

				</div>
				<div>
					{(data !== undefined) && (data.length > 0) ?
						<>
							{
								data.map((info, i) => {
									return (
										<div id={info.albumtitle} key={i}>
											<div>{info.tracktitle}</div>
										</div>
									)
								})}
						</>

						:

						<div><p>Loading data...</p></div>
					}

				</div>
			</div>

		</div>
	);
};

export default DiscoEdit;