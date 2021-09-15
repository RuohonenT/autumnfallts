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
	});



	const [tracktitles, setTracktitles] = useState(data.tracktitles);
	console.log(tracktitles)

	console.log(Object.keys(tracktitles).map((titles) =>
		Object.values(tracktitles[titles]).map(title =>
			title.name)))

	// console.log(titles.map((name, i) => console.log(name, i)));
	// console.log(items.albumtitle)
	// console.log(items.tracktitles)
	// let titles = [...items.tracktitles]
	const handleChange = e => {
		setItems(prev => {
			return { ...prev, [e.target.name]: e.target.value }
		})
	};

	console.log(items.tracktitles)

	const handleTitles = (e, i) => {
		let titles = { ...tracktitles };
		titles[i].name = e.target.value;
		setTracktitles(titles);
	};

	const submitTitles = e => {
		e.preventDefault();
		console.log(tracktitles)
	}
	const handleSubmit = async e => {
		e.preventDefault();
		const update = await updateDisco(id, items.albumtitle, items.year, items.description, tracktitles);
		if (update.status === 200) {
			console.log(update)
			history.push('/disco');
		} else {
			console.log('failing')
		}
	};

	// useEffect(() => {
	// 	const getAlbumData = async () => {
	// 		await axios.get('/api/disco/' + id)
	// 			.then(res => {
	// 				let result = res.data;
	// 				setItems({ albumtitle: result })
	// 			})
	// 			.catch(err => console.log(err))
	// 	}
	// 	return getAlbumData()
	// }, [])

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
				{Object.values(tracktitles).map((title, i) => (
					<div key={i}>
						<input
							type='text'
							name='title'
							value={tracktitles[i].name}
							onChange={e => handleTitles(e, i)}
						/>
						<p>{title.name}</p></div>
				))}
				<button type='submit'>submit</button>
			</form>

			<form onSubmit={handleTitles}>
				<button onClick={submitTitles}>titles</button>
			</form>
		</div>
	);
};

export default DiscoUpdate;