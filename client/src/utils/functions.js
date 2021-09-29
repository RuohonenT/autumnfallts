import axios from 'axios';
import firebase from 'firebase/app';
import { storage } from '../firebase/firebase';


export const checkToken = () => {
	const token = localStorage.getItem('token');
	return token;
};

export const checkAuth = token => {
	return axios.get('api/login', {
		headers: {
			'withCredentials': true,
			'credentials': 'include',
			'Authorization': `Bearer ${token}`
		}
	});
};


//send modified news to backend
export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit/' + id, { subject, content });
};

//send modified album data to backend
export const updateDisco = (id, albumtitle, year, description, tracktitles) => {
	return axios.put('/api/disco/edit/' + id, { albumtitle, year, description, tracktitles });
};


//delete cover art from firebase
export const removeCover = async cover => {
	let imageRef = storage.refFromURL(cover);
	imageRef.delete()
		.then(() => { console.log('cover deleted') })
		.catch(err => console.log('remove cover', err));
};

//send new user data to backend
export const signUp = async (email, password) => {
	return await axios.post('api/users', { email: email, password: password }, {
		'withCredentials': true,
		'credentials': 'include',
		'Content-Type': 'application/json;charset=UTF-8'
	});
};

// login function
export const login = (email, password) => {
	return axios.post('api/login', { email: email, password: password }, {
		'withCredentials': true,
		'credentials': 'include',
		'Content-Type': 'application/json;charset=UTF-8'
	});
};

// get currently logged in user
export const getOwnProfile = token => {
	return axios.get('api/profile/me', {
		headers: {
			'withCredentials': true,
			'credentials': 'include',
			'Authorization': `Bearer ${token}`
		},
	});
};


export const uploadCoverToFirebase = async (file) => {
	//firebase storage doesn't keep the order thus we create newDate var
	//to rename the uploadable file in order to easily sort 
	//the images in function 'fetchImages'(later on 'const urls')
	let date = new Date();
	let name = date.toLocaleString();
	const ref = storage.ref(`/images/covers/${name}`);
	const uploadTask = ref.put(file);
	uploadTask.on('state_changed', console.log('Uploading album art, please wait...'), console.error, () => {
		ref.getDownloadURL()
	});
};

//fetch cover arts from firebase and sort them
export const fetchImages = async () => {
	let storageRef = firebase.storage().ref();
	let result = await storageRef.child('images/covers/').listAll();
	let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
	let sort = urlPromises.sort((a, b) => a - b)

	return Promise.all(sort);
};