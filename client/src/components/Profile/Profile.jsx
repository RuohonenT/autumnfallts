import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context';

const Profile = () => {
	const [email, setEmail] = useState('');
	const { currentUser, token } = useAppContext;

	useEffect(() => {
		const userData = () => {
			if (currentUser) {
				setEmail(currentUser.email);
			} else {
				setEmail('Not logged in');
			}
		}
		return userData;
	}, [currentUser, token])

	return (
		<div>
			{email}

		</div>
	);
};

export default Profile;