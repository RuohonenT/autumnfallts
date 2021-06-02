import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../Context';

const Profile = props => {
	const [email, setEmail] = useState('');
	const [isAdmin, setIsAdmin] = useState('');
	const { token } = useAppContext;
	const { currentUser } = props;
	console.log('profile currentUser', currentUser)

	useEffect(() => {
		const userData = () => {
			if (currentUser) {
				setEmail(currentUser.email);
				setIsAdmin(currentUser.isAdmin)
			} else {
				setEmail('Not logged in');
			}
		}
		return userData();
	}, [currentUser, token])

	return (
		<div>
			<p style={{ color: 'white' }}>{email} {isAdmin}</p>
		</div>
	);
};

export default Profile;