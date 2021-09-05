import React, { useState, useEffect, useReducer, useRef } from 'react';
import DiscoEdit from './DiscoEdit';
import DiscoForm from './DiscoForm/DiscoForm';
import { useAppContext } from '../../Context';
import { fetchImages } from '../../utils/fetchFunctions';
import axios from 'axios';
import './Disco.css';


const Disco = () => {
	const { token } = useAppContext();
	const [data, setData] = useState([]);
	const [covers, setCovers] = useState([]);
	const [albumtitle, setAlbumtitle] = useState([]);
	
	// const [tracktitle, setTracktitle] = useState([]);
	const [description, setDescription] = useState([]);
	const [year, setYear] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isEnabled, setIsEnabled] = useState(true);
	const inputRef = useRef();


	//Load data to display
	useEffect(() => {
		//using the fetch function 
		const loadImages = async () => {
			setIsLoading(true);
			//fetchImages imported from fetchFunctions
			const urls = await fetchImages();
			await axios.get('api/disco')
				.then(res => {
					let albumData = res.data;
					setCovers(urls);
					setData(albumData);
					setIsLoading(false);
				})
				.catch(err => console.log('error', err));
		};

		return loadImages();

	}, [setData, setCovers])



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
					/>
				</>

				:

				<>
					{

						isLoading ?

							console.log('Loading...')

							:


							(data.length > 0 ?

								< div className='disco_content_innards'>
									<div className='three'>
										{
											data.map((det, i) => {
												return <div className='test' key={i}>
													<p>{det.description}</p>

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
												data.map((det, i) => {
													return <div className='two' key={i}>

														<p>{det.albumtitle}</p>
														<p>{det.year}</p>
														{/* <ol>
															{det.tracktitle.map((item, index) => {
																return <li key={item.id}>
																	{item.name}
																</li>
															})}
														</ol> */}

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