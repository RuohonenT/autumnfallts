import axios from "axios";
const URL = process.env.DATABASE_URL || 'http://localhost:5000';

export const updateNews = (id, subject, content) => {
	return axios.put(URL + '/api/news/edit/' + id, { subject, content })
};