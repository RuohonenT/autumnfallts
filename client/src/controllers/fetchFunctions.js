import axios from "axios";

const URL = process.env.DATABASE_URL;

export const updateNews = async (id, subject, content) => {
	return await axios.put(`${id}`, { subject, content })
};