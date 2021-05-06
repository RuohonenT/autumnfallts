import axios from "axios";
const URL = process.env.DATABASE_URL;

export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit' + id, { subject, content })
};