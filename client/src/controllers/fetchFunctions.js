import axios from "axios";

export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit/' + id, { subject, content })
};

export const signUp = async (email, password) => {
	return await axios.post('api/users', { email: email, password: password }, {
		withCredentials: true,
		credentials: 'include'
	});
};