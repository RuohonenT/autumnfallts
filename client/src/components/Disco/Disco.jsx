import React, { useState, useEffect, useReducer, useRef } from 'react';
import DiscoForm from './DiscoForm/DiscoForm';
import { useAppContext } from '../../Context';
import { fetchImages } from '../../utils/fetchFunctions';
import axios from 'axios';
import './Disco.css';


const Disco = () => {
	const { token } = useAppContext();
	const [albumData, setAlbumData] = useState([]);
	const [file, setFile] = useState(null);
	const [url, setURL] = useState();
	const initialFormStates = {
		albumtitle: '',
		year: '',
		description: '',
		tracktitles: []
	};
	const [data, setData] = useState([]);
	const [covers, setCovers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEnabled, setIsEnabled] = useState(true);


	//Load data to display
	useEffect(() => {
		//using the fetch function 
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
				.catch(err => console.log('error', err));
		};

		console.log('albumData', albumData)
		return loadData();

	}, [setAlbumData])



	return (
		<div className='disco_content'>
			{token ?
				<>
					{/* <DiscoEdit
						covers={covers}
						data={data}
						setData={setData}
						albumtitle={albumtitle}
						setAlbumtitle={setAlbumtitle}
						year={year}
						setYear={setYear}
						tracktitle={tracktitle}
						// setTracktitle={setTracktitle}
						description={description}
						setDescription={setDescription}
						dispath={dispatch}
						addTitle={addTitle}
						inputRef={inputRef}
					/> */}
					<DiscoForm
						albumData={albumData}
						setAlbumData={setAlbumData}
						file={file}
						setFile={setFile}
						url={url}
						setURL={setURL}
						initialFormStates={initialFormStates}
					/>
				</>

				:

				<>
					{

						isLoading ?

							console.log('Loading...')

							:


							(albumData.length > 0 ?

								< div className='disco_content_innards'>
									<div className='three'>
										{
											albumData.map((det, i) => {
												return <div className='test' key={i}>
													<p>{det.description}</p>

												</div>
											})
										}
										{
											albumData.map((det, i) => console.log(det))
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
																return <li key={index}>
																	{item.name}
																</li>
															})}
														</ol>

													</div>
												})
											}
										</div>

									</div>

								</div>

								:

								<><p>No data found</p></>
							)
					}
				</>

			}
		</div >
	);
};

export default Disco;