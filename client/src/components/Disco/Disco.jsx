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

	const [isLoading, setIsLoading] = useState(false);
	const [allData, setAllData] = useState([]);

	useEffect(() => {
		//using the fetch function 
		const loadImages = async () => {
			//fetchImages imported from fetchFunctions
			const urls = await fetchImages();
			setCovers([urls]);
		};

		loadImages();

		const getData = async () => {
			await axios.get('api/disco')
				.then(res => {
					let albumData = res.data;
					setData(albumData);
				})
				.catch(setData(['No Discography found']));
		};

		getData();

	}, [setCovers, setAlbumtitle], []);






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
					<div className='wrapper'>
						<>
							{
								covers.map((url, i) => {
									return <div className='wrapper'>

										<div className='one' key={i}><img className='disco_cover' key={i} src={url} alt=''></img></div>

									</div>
								})
							}
						</>
						<>
							{data.map((details, i) => {
								return (
									<div id={albumtitle} key={i} className='two'>{details.albumtitle}<br />
										{details.tracktitle}<br />
										{details.year}</div>
								)
							})}
						</>
						<div className='three'>Three</div>

						{/* <div className='four'>Four</div>
						<div className='five'>Five</div>
						<div className='six'>Six</div> */}
					</div>

					<div className='disco_content_innards'>

						<div className='disco_covers'>
							{/* {
								covers.map((url, i) => {
									return <img className='disco_cover' key={i} src={url} alt=''></img>
								})
							} */}
							{/* </div>

					<div className='disco_details'> */}
							{(data !== undefined) && (data.length > 0) ?
								<>
									{
										data.map((details, i) => {
											return (
												<div id={details.albumtitle} key={i}>
													<div><p>{details.albumtitle}</p></div>
													<p>{details.year}</p>
													<p>{details.tracktitle}</p>
													<div className='disco_description'><p>{details.description}</p></div>
												</div>
											)
										})}
								</>

								:

								<div><p>Loading data...</p></div>
							}

						</div>
					</div>
				</>
			}
		</div>
	);
};

export default Disco;