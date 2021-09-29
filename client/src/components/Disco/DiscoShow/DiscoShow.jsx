import React from 'react';
import { removeCover } from '../../../utils/functions';
import { useAppContext } from '../../../Context';
import nocover from '../../../img/nocover.png';

import './DiscoShow.css';

const DiscoShow = props => {
	const { token, isLoading, state } = useAppContext();
	const { albumData, covers, setCovers, removeData, editData } = props;


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

							<div className='col'>
								{albumData.map(item => <div style={{ minHeight: '500px' }} key={item.id}><img src={nocover} alt='no cover' width='100%' /></div>)}
							</div>
						}

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
												<button onClick={() => editData(det.id, det.albumtitle, det.year, det.tracktitles, det.description)}>EDIT</button>
												<button onClick={() => removeData(det.id)}>DELETE DATA</button>
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