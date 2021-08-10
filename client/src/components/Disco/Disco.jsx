import React, { useState, useEffect } from 'react';
import DiscoEdit from './DiscoEdit';
import { useAppContext } from '../../Context';
import firebase from 'firebase/app';
import axios from 'axios';
import 'firebase/storage';
import './Disco.css';

const Disco = () => {
	const { token } = useAppContext();
	const [data, setData] = useState([]);
	const [covers, setCovers] = useState([]);
	let storageRef = firebase.storage().ref();

	const [albumtitle, setAlbumtitle] = useState([]);
	const [tracktitle, setTracktitle] = useState([]);
	const [description, setDescription] = useState([]);

	useEffect(() => {
		//fetching images from Firebase
		const fetchImages = async () => {
			let result = await storageRef.child('images/covers/').listAll();
			let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());

			return Promise.all(urlPromises);
		};

		//using the fetch function 
		const loadImages = async () => {
			const urls = await fetchImages();
			setCovers(urls);
		};

		return loadImages();

	}, [setCovers, storageRef]);


	//Loading data from Heroku PostgreSQL
	useEffect(() => {
		const getData = async () => {
			await axios.get('api/disco')
				.then(res => {
					let albumData = res.data;
					setData(albumData);
					console.log('albumData', albumData)
				})
				.catch(setData(['No Discography found']));
		};

		return getData();

	}, [setData, albumtitle]);

	return (
		<div className='disco_content'>
			{token ?
				<>
					<DiscoEdit
						covers={covers}
						data={data}
						setData={setData}
						albumtitle={albumtitle}
						setAlbumtitle={setAlbumtitle}
						tracktitle={tracktitle}
						setTracktitle={setTracktitle}
						description={description}
						setDescription={setDescription}
					/>
				</>

				:

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
			}

		</div>
	);
};

export default Disco;