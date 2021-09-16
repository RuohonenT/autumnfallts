import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { updateDisco } from '../../../utils/fetchFunctions'

const DiscoUpdate = () => {
	const { id } = useParams();
	const location = useLocation();
	const data = location.state.params;
	const history = useHistory();

	const [items, setItems] = useState({
		albumtitle: data.albumtitle,
		year: data.year,
		description: data.description,
		tracktitles: data.tracktitles
	});

	const handleChange = e => {
		setItems(prev => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	};

	const handleTitles = (e, i) => {
		let titles = { ...items };
		titles.tracktitles[i][e.target.name] = e.target.value;
		setItems(titles);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const update = await updateDisco(id, items.albumtitle, items.year, items.description, items.tracktitles);
		if (update.status === 200) {
			console.log(update)
			history.push('/disco');
		} else {
			console.log('failing')
		}
	};

	return (
		<div>
			"puoliks suunniteltu... hyvin tulee tehtyä."

			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='albumtitle'
					placeholder={items.albumtitle}
					value={items.albumtitle}
					onChange={handleChange}
				/>
				<input
					type='number'
					name='year'
					placeholder={items.year}
					value={items.year}
					onChange={handleChange}
				/>
				<input
					type='text'
					name='description'
					placeholder={items.description}
					value={items.description}
					onChange={handleChange}
				/>
				{Object.values(items.tracktitles).map((title, i) => (
					<div key={i}>
						<input
							type='text'
							name='name'
							value={items.tracktitles[i].name}
							onChange={e => handleTitles(e, i)}
						/>
						<p>{title.name}</p></div>
				))}
				<button type='submit'>submit</button>
			</form>
		</div>
	);
};

export default DiscoUpdate;