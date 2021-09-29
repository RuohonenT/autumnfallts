import React from 'react';
import { removeCover } from '../../../utils/functions';
import { useAppContext } from '../../../Context';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './DiscoShow.css';

const DiscoShow = props => {
	const { token, isLoading, state } = useAppContext();
	const { albumData, covers, setCovers } = props;
	const history = useHistory();

	//delete album data from backend
	const removeAlbum = async id => {
		await axios.delete('api/disco/delete', { data: { id } })
			.then(res => console.log(res.data))
			.catch(err => console.log('data deletion', err));
	};

	const editDisco = (id, albumtitle, year, tracktitles, description) => {
		history.push('disco/' + id, { params: { albumtitle, year, tracktitles, description } });
	};


	return (

		isLoading ?

			<p>{state}</p>

			:

			<>
				{albumData.length > 0 ?
					<div className='rows'>

						{covers.length > 0 ?
							<div className='col'>

								{covers.map((url, i) =>
									<div style={{ minHeight: '500px' }} key={i}>
										<img src={url} alt='' width='100%' />

										{/* if user is logged in she/he can remove selected cover*/}
										{token ?
											<button
												onClick={() => removeCover(url).then(setCovers(covers.filter(img => img !== url)))}>
												DELETE COVER</button> : null}

									</div>
								)}


							</div>
							:
							'no cover to show'}

						<div className='col'>
							{
								albumData.map((det, i) =>
									<div style={{ minHeight: '500px' }} key={i}>
										<p>{det.albumtitle}</p>
										<p>{det.year}</p>
										<p>{det.description}</p>
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

										{/* if user is logged in she/he can remove selected data*/}
										{token ?
											<>
												<button onClick={() => editDisco(det.id, det.albumtitle, det.year, det.tracktitles, det.description)}>EDIT</button>
												<button onClick={() => removeAlbum(det.id)}>DELETE DATA</button>
											</> : null}
									</div>
								)
							}
						</div>
					</div>

					:


					<>
						<p>...No Data Found...</p>
					</>
				}
			</>


	);
};

export default DiscoShow;