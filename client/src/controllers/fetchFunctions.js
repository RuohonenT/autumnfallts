import axios from "axios";

export const updateNews = (id, subject, content) => {
	return axios.put('/api/news/edit/' + id, { subject, content })
};