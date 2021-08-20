import React, { useState, useEffect } from 'react';
import DiscoEdit from './DiscoEdit';
import { useAppContext } from '../../Context';
import { fetchImages } from '../../controllers/fetchFunctions';
import axios from 'axios';
import './Disco.css';


const Disco = () => {
	const { token } = useAppContext();
	const [data, setData] = useState([]);
	const [covers, setCovers] = useState([]);
	const [albumtitle, setAlbumtitle] = useState([]);
	const [tracktitle, setTracktitle] = useState([]);
	const [description, setDescription] = useState([]);
	const [year, setYear] = useState([]);

	const [allData, setAllData] = useState([])
	const [isLoading, setIsLoading] = useState(false);

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
					// setIsLoading(false);
				})
				.catch(err => console.log('error', err));
		};
		return loadImages();
	}, [setData], [])

	useEffect(() => {

		// setIsLoading(true);
		const dataWork = async () => {
			await setAllData([{ covers: [...covers], data: [...data] }]);
			setTimeout(setIsLoading(false), 4000);
		};

		return dataWork();

	}, [data, covers])

	// console.log(allData)

	// useEffect(() => {
	// 	const getData = async () => {
	// 		await axios.get('api/disco')
	// 			.then(res => {
	// 				let albumData = res.data;
	// 				setData(albumData)
	// 			})
	// 			.catch(setData(['No Discography found']));
	// 	};

	// 	return getData();

	// }, [setCovers]);

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
						year={year}
						setYear={setYear}
						tracktitle={tracktitle}
						setTracktitle={setTracktitle}
						description={description}
						setDescription={setDescription}
					/>
				</>

				:

				<>
					{

						isLoading ?

							console.log('Loading...')

							:


							<div className='disco_content_innards'>

								<div className='wrapper'>
									<>
										<div>
											{covers.map((url, i) => {
												return <div className='one'>
													<img src={url} alt='' width='100%' />
												</div>
											})}
										</div>

										<div>
											{
												data.map((det, i) => {
													return <div className='two'>

														<p>{det.albumtitle}</p>
														<p>{det.year}</p>
														<p>{det.tracktitle}</p>
														<p>{det.description}</p>

													</div>
												})
											}
										</div>

										<div>
											{
												data.map((det, i) => {
													return <div className='three'>

														<p>{det.albumtitle}</p>
														<p>{det.year}</p>
														<p>{det.tracktitle}</p>
														<p>{det.description}</p>

													</div>
												})
											}
										</div>
									</>

								</div>

							</div>

					}
				</>

			}
		</div >
	);
};

export default Disco;