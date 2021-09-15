import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../utils/fetchFunctions';
import { useAppContext } from '../../Context';
import './Login.css';

const Login = () => {
	const [email, setEmailText] = useState('');
	const [password, setPasswordText] = useState('');
	const { token, setIsLogin, setToken, logout } = useAppContext();
	const history = useHistory();

	const handleSubmit = async (e, email, password) => {
		e.preventDefault();
		const loginResult = await login(email, password);
		if (loginResult.status === 200) {
			const data = await loginResult;
			if (data.data.token) {
				localStorage.setItem('token', data.data.token);
				setToken(data.data.token);
				setIsLogin(true);
				setEmailText('');
				setPasswordText('');
				history.push('/profile');
			} else {
				console.log('Wrong email or password');
				setPasswordText('');
			};
		} else {
			console.log('Wrong email or password');
			setPasswordText('');
		};
	};

	return (
		<div className='login_content'>
			<form className='login_form'>
				<input
					type='text'
					name='email'
					onChange={e => setEmailText(e.target.value)}
					placeholder='E-mail'
				/>
				<input
					type='password'
					name='password'
					onChange={e => setPasswordText(e.target.value)}
					placeholder='Password'
				/>
				{
					token ?
						<button
							onClick={logout}>
							Logout</button>
						:
						<button
							onClick={e => handleSubmit(e, email, password)}>
							Login</button>
				}
			</form>
		</div>
	);
};

export default Login;