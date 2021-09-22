import React, { useReducer, useState, useEffect, useRef } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { updateDisco } from '../../../utils/fetchFunctions';
import formReducer from '../../../utils/formReducer';

const DiscoUpdate = props => {
	// const { handleChange } = props;
	const { id } = useParams();
	const location = useLocation();
	const data = location.state.params;
	const history = useHistory();
	const [edit, setEdit] = useState(false);
	const inputRef = useRef();

	const [formState, dispatch] = useReducer(formReducer, data);

	const handleChange = e => {
		dispatch({
			type: 'handleInputChange',
			field: e.target.name,
			name: e.target.value
		})
	};

	const changeTitle = (e, title) => {
		dispatch({
			type: 'editTitle',
			idx: title.id,
			name: e.target.value,
			payload: { id: title.id, name: e.target.value }
		})
	};

	const remove = (e, idx) => {
		e.preventDefault();
		dispatch({
			type: 'removeTitle',
			idx: idx
		})
	};

	const add = e => {
		e.preventDefault();
		dispatch({
			type: 'addTitle',
			name: inputRef.current.value,
		});
		inputRef.current.value = '';
	};



	// const [items, setItems] = useState({
	// 	albumtitle: data.albumtitle,
	// 	year: data.year,
	// 	description: data.description,
	// 	tracktitles: data.tracktitles,
	// });

	// const handleChange = e => {
	// 	setItems({ ...items, [e.target.name]: e.target.value })
	// };

	// const handleTitles = (e, i) => {
	// 	let titles = { ...items };
	// 	titles.tracktitles[i][e.target.name] = e.target.value;
	// 	setItems(titles);
	// };

	// const deleteTitle = i => {
	// 	let titles = { ...items };
	// 	delete titles.tracktitles[i];
	// 	console.log(titles)
	// 	return setItems(titles);
	// };


	const handleSubmit = async e => {
		e.preventDefault();
		// await addData(formState);
		const update = await updateDisco(id, formState.albumtitle, formState.year, formState.description, formState.tracktitles);
		if (update.status === 200) {
			console.log('album data updated :: =>', update)
			history.push('/disco');
		} else {
			console.log('failing')
		}
	};

	const toggleEdit = e => {
		e.preventDefault();
		setEdit(!edit);
	}


	return (
		<div>
			"puoliks suunniteltu... hyvin tulee tehtyä."

			<form>
				<input
					type='text'
					name='albumtitle'
					placeholder={formState.albumtitle}
					value={formState.albumtitle}
					onChange={handleChange}
				/>
				<input
					type='number'
					name='year'
					placeholder={formState.year}
					value={formState.year}
					onChange={handleChange}
				/>
				<input
					type='text'
					name='description'
					placeholder={formState.description}
					value={formState.description}
					onChange={handleChange}
				/>
				<p>Double click title to edit:</p>
				<ol>
					{Object.values(formState.tracktitles).map((title, idx) => {
						// const idd = title.id;
						if (title === null) {
							return title === '';
						}
						return <div key={idx}>
							{edit ?

								<li key={title.id}>
									{title.name}
									<input
										type='text'
										name='name'
										value={formState.tracktitles[idx].name}
										onChange={(e) => changeTitle(e, title)}
									/>
									<button onClick={(e) => toggleEdit(e)}>edit</button>
								</li>

								:

								<div>
									<button onClick={() => setEdit(!false)}>edit</button>
									<div key={idx}>
										{title.name}
										<button onClick={(e) => remove(e, idx)}>X</button>
									</div>

								</div>
							}
						</div>

					})}
				</ol>
				<button type='submit' onClick={handleSubmit}>submit</button>
			</form>

			<form onSubmit={(e) => add(e)} className='form'>
				<label>Titles:</label>
				<input
					ref={inputRef}
					type='text'
					placeholder='add tracktitle'
				/>
			</form>
		</div >
	);
};

export default DiscoUpdate;