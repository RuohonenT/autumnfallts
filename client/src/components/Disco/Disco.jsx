import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useHistory } from 'react-router-dom'
import DiscoEdit from './DiscoEdit/DiscoEdit';
import formReducer from '../../utils/formReducer';
import { useAppContext } from '../../Context';
import { fetchImages } from '../../utils/fetchFunctions';
import { storage } from '../../firebase/firebase';
import axios from 'axios';
import './Disco.css';

//initial values, and hasError booleans for some very lazy error checking around line 90
const initialFormStates = {
	albumtitle: { value: '', hasError: true },
	year: { value: '', hasError: true },
	description: { value: '', hasError: true },
	tracktitles: [],
	hasError: true
};

const Disco = () => {
	const { token } = useAppContext();
	const [albumData, setAlbumData] = useState([]);
	const [file, setFile] = useState(null);
	const [, setURL] = useState();
	const [state, setState] = useState('Loading...');
	const [covers, setCovers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEnabled, setIsEnabled] = useState(false);
	const [formState, dispatch] = useReducer(formReducer, initialFormStates);
	const inputRef = useRef();
	const history = useHistory();

	//event handler to fire dispatch when one of the initialFormStates values are being changed
	const handleChange = e => {
		dispatch({
			type: 'handleInputChange',
			field: e.target.name,
			name: { value: e.target.value, hasError: false }
		})
	};

	//event handler to fire dispatch when a new track title is being added
	const submitTitle = e => {
		e.preventDefault();
		dispatch({
			type: 'handleTitleChange',
			name: inputRef.current.value,
		});
		inputRef.current.value = '';
	};

	//function using axios.post for sending the modified/written values to backend, 
	//executed inside upon handleSubmit (see below, around line 76)
	const addData = async formState => {
		await axios
			.post('api/disco/add', {
				albumtitle: formState.albumtitle.value,
				year: formState.year.value,
				tracktitles: formState.tracktitles,
				description: formState.description.value
			})
			.then(res => {
				console.log(res.data.msg)
			})
			.catch(err => console.log(err))
	};

	//checking for 'hasErrors' by mapping through each field...
	useEffect(() => {
		Object.values(formState).map(state =>
			state.hasError !== false && formState.hasError !== false ?
				setIsEnabled(false) : setIsEnabled(true));

	}, [formState])

	//executing addData function, firing dispatch to clear values, and uploading image to firebase...
	const handleSubmit = async e => {
		e.preventDefault();
		await addData(formState);
		dispatch({ type: 'clear' });

		//firebase storage doesn't keep the order thus we create a var called
		//newDate to rename the uploadable file in order to easily sort 
		//the images in func fetchImages(later on const urls)
		let date = new Date();
		let name = date.toLocaleString();
		const ref = storage.ref(`/images/covers/${name}`);
		const uploadTask = ref.put(file);
		if (file !== null) {
			uploadTask.on('state_changed', console.log('Uploading album art, please wait...'), console.error, () => {
				ref.getDownloadURL()
					.then(url => {
						setURL(url);
						setFile(null);
						console.log('Album cover uploaded!')
					})
					.catch(err => console.log(err));
				console.log('handleSubmit', formState)
			})
		} else { history.push('/disco') }
	};

	//Load data to display
	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			//fetchImages imported from fetchFunctions
			const urls = await fetchImages();
			await axios.get('api/disco')
				.then(res => {
					let albumData = res.data;
					setAlbumData(albumData);
					setCovers(urls)
					setIsLoading(false);
				})
				.catch(err => {
					console.log('error', err)
					setState('...No data found...')
				});
		};

		return loadData();

	}, [formState, setFile])

	const editDisco = (id, albumtitle, year, tracktitles, description) => {
		history.push('disco/' + id, { params: { albumtitle, year, tracktitles, description } })
	};

	return (
		<div className='disco_content'>
			{token ?
				<>
					<DiscoEdit
						file={file}
						setFile={setFile}
						formState={formState}
						inputRef={inputRef}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						submitTitle={submitTitle}
						dispatch={dispatch}
						isEnabled={isEnabled}

					/>
				</>

				:

				<>
					{

						isLoading ?


							<p>{state}</p>


							:


							(albumData.length > 0 ?

								< div className='disco_content_innards'>
									"jollain soi puhelin"
									<div className='three'>
										{
											albumData.map((det, i) => {
												return <div className='test' key={i}>
													<p>{det.description}</p>
													<button onClick={() => editDisco(det.id, det.albumtitle, det.year, det.tracktitles, det.description)}>EDIT</button>
												</div>
											})
										}
									</div>

									<div className='wrapper'>

										<div>
											{covers.map((url, i) => {
												return <div className='one' key={i}>
													<img src={url} alt='' width='100%' />
												</div>
											})}
										</div>

										<div>
											{
												albumData.map((det, i) => {
													return <div className='two' key={i}>

														<p>{det.albumtitle}</p>
														<p>{det.year}</p>
														<ol>
															{Object.values(det.tracktitles).map((item, index) => {
																if (item === null) {
																	return item === ''
																} else {
																	return <li key={index}>
																		{item.name}
																	</li>
																}
															})}
														</ol>

													</div>
												})
											}
										</div>

									</div>

								</div>

								:

								<><p>...No data found...</p></>
							)
					}
				</>

			}
		</div >
	);
};

export default Disco;