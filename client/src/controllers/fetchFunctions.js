import axios from "axios";

export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit/' + id, { subject, content })
};

// sign up function
export const signUp = async (email, password) => {
	return await axios.post('api/users', { email: email, password: password }, {
		withCredentials: true,
		credentials: 'include'
	},
		// headers: {

		// "Content-Type": "application/json",
		// }
		// mode: 'cors',
		// credentials: "include",
		// body: JSON.stringify({ email, password })
	);
};

// export const signUp = (email, password) => {
// 	return fetch('api/users', {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		mode: 'cors',
// 		credentials: "include",
// 		body: JSON.stringify({ email, password })
// 	});
// };