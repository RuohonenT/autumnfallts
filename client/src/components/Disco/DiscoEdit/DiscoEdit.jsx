import React from 'react';
import './DiscoEdit.css';

const DiscoEdit = props => {
	const { file, setFile, isEnabled, formState, inputRef, handleSubmit, handleChange, submitTitle, dispatch } = props;

	return (
		<div className='content'>

			<h1>Add a record...</h1>

			<div className='forms'>
				<form className='form'>
					<label>Album title:</label>
					<input
						type='text'
						name='albumtitle'
						placeholder='album title'
						value={formState.albumtitle.value}
						className={formState.albumtitle.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Release year:</label>
					<input
						type='number'
						name='year'
						placeholder='year'
						value={formState.year.value}
						className={formState.year.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Additional info:</label>
					<textarea
						type='text'
						name='description'
						placeholder='description'
						value={formState.description.value}
						className={formState.description.hasError ? 'error' : ''}
						onChange={handleChange}
					/>
					<label>Cover art: </label>
					<input
						type='file'
						className={!file ? 'error' : ''}
						onChange={e => setFile(e.target.files[0])} />
				</form>

				<form onSubmit={submitTitle} className='form'>
					<label>Titles:</label>
					<input
						ref={inputRef}
						type='text'
						placeholder='add tracktitle'
						className={formState.hasError ? 'error' : ''}
					/>
				</form>
				<button disabled={!isEnabled || !file} type='submit' onClick={handleSubmit}>Tästä näin</button>
				<ol>
					{formState.tracktitles.map((title, idx) =>
						<li key={title.id}>
							{title.name}
							<button onClick={() => dispatch({ type: 'removeTitle', idx })}>x</button>
						</li>
					)}
				</ol>
			</div>
		</div>

	);
};

export default DiscoEdit;