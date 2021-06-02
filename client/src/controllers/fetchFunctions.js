import axios from 'axios';

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




//FETCH

// export const checkAuth = (token) => {
// 	return fetch('api/login', {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		},
// 		mode: 'cors',
// 		credentials: "include",
// 	});
// };

// export const getOwnProfile = token => {
// 	return fetch('api/profile/me', {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 			"Authorization": `Bearer ${token}`
// 		},
// 		mode: 'cors',
// 		credentials: "include"
// 	});
// };


// export const login = (email, password) => {
// 	return fetch('api/login', {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		mode: 'cors',
// 		credentials: "include",
// 		body: JSON.stringify({ email, password })
// 	});
// };