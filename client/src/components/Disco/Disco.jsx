import React, { useState, useEffect, useReducer, useRef } from 'react';
import DiscoShow from './DiscoShow/DiscoShow';
import DiscoAdd from './DiscoAdd/DiscoAdd';
import formReducer from '../../utils/formReducer';
import { useAppContext } from '../../Context';
import { fetchImages } from '../../utils/functions';
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
	const { token, setState, setIsLoading, setIsOpen } = useAppContext();
	const [albumData, setAlbumData] = useState([]);
	const [file, setFile] = useState(null);
	const [covers, setCovers] = useState([]);
	const [formState, dispatch] = useReducer(formReducer, initialFormStates);
	const inputRef = useRef();


	//function using axios.post to send the modified/written values to backend, 
	//executed upon handleSubmit (see DiscoAdd.jsx, around line 34)
	const addData = async formState => {
		await axios
			.post('api/disco/add', {
				albumtitle: formState.albumtitle.value,
				year: formState.year.value,
				tracktitles: formState.tracktitles,
				description: formState.description.value
			})
			.then(res => {
				console.log(res.data.msg);
				setAlbumData(res.data);
			})
			.catch(err => console.log(err));
	};

	//Load data to display
	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			//fetchImages imported from fetchFunctions
			const urls = fetchImages();
			await axios.get('api/disco')
				.then(res => {
					let albumDetails = res.data;
					setAlbumData(albumDetails);
					setCovers(urls);
					setIsLoading(false);
					setState('Loading...');
				})
				.catch(err => {
					console.log('error', err);
					setIsLoading(false);
					setState('Error while loading data...');
				});

		};

		return loadData();

	}, [setIsLoading, setState, setAlbumData]);

	return (
		<div className='disco_container'>
			<h1>Discography ::</h1>

			{token ?
				<>
					<DiscoAdd
						file={file}
						setFile={setFile}
						formState={formState}
						inputRef={inputRef}
						dispatch={dispatch}
						setIsOpen={setIsOpen}
						addData={addData}
					/>
					<DiscoShow
						albumData={albumData}
						covers={covers}
						setCovers={setCovers}

					/>
				</>

				:

				<>
					<DiscoShow
						albumData={albumData}
						covers={covers}
						setCovers={setCovers}
					/>
				</>

			}
		</div >
	);
};

export default Disco;