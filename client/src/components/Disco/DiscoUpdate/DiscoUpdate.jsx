import React, { useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { updateDisco } from '../../../utils/fetchFunctions';

const DiscoUpdate = () => {
	const { id } = useParams();
	const location = useLocation();
	const data = location.state.params;
	const history = useHistory();
	const [edit, setEdit] = useState(false);

	const [items, setItems] = useState({
		albumtitle: data.albumtitle,
		year: data.year,
		description: data.description,
		tracktitles: data.tracktitles,
	});

	const handleChange = e => {
		setItems({ ...items, [e.target.name]: e.target.value })
	};

	const handleTitles = (e, i) => {
		let titles = { ...items };
		titles.tracktitles[i][e.target.name] = e.target.value;
		setItems(titles);
	};

	const deleteTitle = i => {
		let titles = { ...items };
		delete titles.tracktitles[i];
		console.log(titles)
		return setItems(titles);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const update = await updateDisco(id, items.albumtitle, items.year, items.description, items.tracktitles);
		if (update.status === 200) {
			console.log('album data updated :: =>', update)
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
				<p>Double click title to edit:</p>
				<ol>
					{Object.values(items.tracktitles).map((e, i) => {
						if (e === null) {
							return e === '';
						}
						return <div onDoubleClick={() => setEdit(true)} key={i}>
							{edit ?

								<li key={i}>
									{e.name}
									<input
										type='text'
										name='name'
										value={items.tracktitles[i].name}
										onChange={e => handleTitles(e, i)}
									/>
								</li>
								
								:

								<div key={i}>
									{e.name}
									<button onClick={() => deleteTitle(i)}>X</button>
								</div>
							}
						</div>

					})}
				</ol>
				<button type='submit'>submit</button>
			</form>
		</div >
	);
};

export default DiscoUpdate;