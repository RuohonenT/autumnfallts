import React, { useState } from 'react';
import { storage } from '../../firebase/firebase';
import axios from 'axios';

const Disco = () => {
	const [file, setFile] = useState(null);
	const [url, setURL] = useState("");

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	function handleUpload(e) {
		e.preventDefault();
		const ref = storage.ref(`/images/${file.name}`);
		const uploadTask = ref.put(file);
		uploadTask.on("state_changed", console.log, console.error, () => {
			ref
				.getDownloadURL()
				.then((url) => {
					setFile(null);
					setURL(url);
				});
		});
	}

	return (
		<div>
			<form onSubmit={handleUpload}>
				<input type="file" onChange={handleChange} />
				<button disabled={!file}>upload to firebase</button>
			</form>
			<img src={url} alt="" />
		</div>
	);
}

export default Disco;


// const Disco = () => {
// 	const [state, setState] = useState({ selectedFile: null });


// 	const onFileChange = event => {
// 		setState({ selecetedFile: event.target.files[0] });
// 	};

// 	const fileUploadHandler = () => {
// 		axios.post()
// 	};

// 	return (
// 		<div>
// 			<input type='file' onChange={onFileChange} />
// 			<button onClick={fileUploadHandler}>Upload</button>
// 		</div>
// 	);

// };
