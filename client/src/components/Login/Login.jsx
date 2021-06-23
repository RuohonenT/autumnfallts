import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../controllers/fetchFunctions';
import { useAppContext } from '../../Context';
import './Login.css';

const Login = () => {
	const [email, setEmailText] = useState('');
	const [password, setPasswordText] = useState('');
	const { setIsLogin, setToken } = useAppContext();
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
				history.push('/profile');
			} else {
				console.log('Wrong email or password');
			}
		} else {
			console.log('Wrong email or password');
		}
	};

	const logout = () => {
		setIsLogin(false);
		localStorage.removeItem('token');
		setToken(null);
		history.push('/');
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
				<button
					onClick={e => handleSubmit(e, email, password)}>Login</button>
				<button onClick={logout}>Logout</button>
			</form>
		</div>
	);
};

export default Login;