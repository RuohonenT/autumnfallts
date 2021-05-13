import React from 'react';
import './Bio.css';

const ShowBio = ({ bio }) => {
	return (
		<div className='bio_content_innards'>
			{bio.length > 0 ?
				<>
					{
						bio.map((cont, i) => {
							return (
								<div id={cont.content} key={i}>
									<div><p>{cont.content}</p></div>
								</div>
							)
						})
					}
				</>
				: <div><p>No Bio Found</p></div>}
		</div >
	)
};

export default ShowBio;