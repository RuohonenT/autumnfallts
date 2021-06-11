import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context';
import './Profile.css';

const Profile = props => {
	const [email, setEmail] = useState('');
	const { token } = useAppContext;
	const { currentUser } = props;

	useEffect(() => {
		const userData = () => {
			if (currentUser) {
				setEmail(currentUser.email);
			} else {
				setEmail('Not logged in');
			}
		}
		return userData();
	}, [currentUser, token])

	return (
		<div className='profile_content'>
			<div className='profile_content_innards'>
				<p>{email}</p>
			</div>
		</div>
	);
};

export default Profile;