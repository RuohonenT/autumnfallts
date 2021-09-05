import axios from 'axios';
import firebase from 'firebase/app';

//check if token can be found from local storage or not
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
		},
	});
};

export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit/' + id, { subject, content })
};

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

export const fetchImages = async () => {
	let storageRef = firebase.storage().ref();
	let result = await storageRef.child('images/covers/').listAll();
	let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
	let sort = urlPromises.sort((a, b) => a - b)

	return Promise.all(sort);
};