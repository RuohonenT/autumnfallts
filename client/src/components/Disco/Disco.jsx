import React, { useState, useEffect, useReducer, useRef } from 'react';
import DiscoShow from './DiscoShow/DiscoShow';
import DiscoAdd from './DiscoAdd/DiscoAdd';
import formReducer from '../../utils/formReducer';
import { useAppContext } from '../../Context';
import { useHistory } from 'react-router-dom';
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
	const { token, setIsOpen } = useAppContext();
	const [state, setState] = useState('Loading...');
	const [file, setFile] = useState(null);
	const [covers, setCovers] = useState([]);
	const [formState, dispatch] = useReducer(formReducer, initialFormStates);
	const [albumData, setAlbumData] = useState({ formState });
	const [isLoading, setIsLoading] = useState(false);
	const history = useHistory();
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
				console.log(res.data.disco);
			})
			.catch(err => console.log(err));
	};

	//Load data to display
	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			//fetchImages imported from fetchFunctions
			await fetchImages()
				.then(res => setCovers(res))
				.catch(err => console.log('while loading cover :: =>', err))
			await axios.get('api/disco')
				.then(res => {
					setAlbumData(res.data);
					setIsLoading(false);
				})
				.catch(err => {
					console.log('error', err);
					setIsLoading(false);
				});
		};

		return loadData();

	}, [setIsLoading, state]);


	const editData = (id, albumtitle, year, tracktitles, description) => {
		history.push('disco/' + id, { params: { albumtitle, year, tracktitles, description } });
	};

	//delete album data from backend
	const removeData = async id => {
		await axios.delete('api/disco/delete', { data: { id } })
			.then(setState('data removed'))
			.catch(err => console.log('data deletion', err));
	};

	return (
		<div className='disco_container'>
			<h1>Discography ::</h1>


			<>
				{token ?
					<DiscoAdd
						file={file}
						setFile={setFile}
						formState={formState}
						inputRef={inputRef}
						dispatch={dispatch}
						setIsOpen={setIsOpen}
						addData={addData}
						setState={setState}
					/>

					:

					null
				}

				<DiscoShow
					albumData={albumData}
					setCovers={setCovers}
					removeData={removeData}
					editData={editData}
					setAlbumData={setAlbumData}
					covers={covers}
					setIsLoading={setIsLoading}
					isLoading={isLoading}
				/>

			</>
		</div >
	);
};

export default Disco;