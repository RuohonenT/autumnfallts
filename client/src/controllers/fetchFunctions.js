import axios from "axios";

export const updateNews = async (id, subject, content) => {
	return await axios.put(`${id}`, { subject, content })
};