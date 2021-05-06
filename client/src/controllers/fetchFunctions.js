import axios from "axios";

const URL = process.env.DATABASE_URL;

export const updateNews = (id, subject) => {
	return axios.put(`${URL}/news/edit/${id}`, { subject })
};