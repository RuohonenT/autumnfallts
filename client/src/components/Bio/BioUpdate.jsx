import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './Bio.css';
import axios from 'axios';

const BioUpdate = (props) => {
	const { id } = useParams();
	// const { bio, setBio, content, setContent, header, setHeader } = props;
	const location = useLocation();
	const myparam = location.state.params;

	console.log(myparam);

	// const updateBio = async header => {
	// 	await axios
	// 		.put(`api/bio/edit/${id}`, { header })
	// 		.then(res => {
	// 			setBio(res.data);
	// 		})
	// 		.catch(err => console.log(err));
	// };

	return (<>jkjjkh</>)

}


export default BioUpdate;