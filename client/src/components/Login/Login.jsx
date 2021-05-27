import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../controllers/fetchFunctions';
import { useAppContext } from '../../Context';
// import '.Login.css';

const Login = () => {
	const [email, setEmailText] = useState('');
	const [password, setPasswordText] = useState('');
	const { setIsLogin, setToken } = useAppContext();
	const history = useHistory();

	const handleSubmit = async (e, email, password) => {
		e.preventDefault();
		const loginResult = await login(email, password);
		console.log(loginResult);
		if (loginResult.status === 200) {
			const data = await loginResult.json();
			console.log(data);
			if (data.token) {
				localStorage.setItem('token', data.token);
				setToken(data.token);
				setIsLogin(true);
				history.push('/profile');
			} else {
				console.log('Wrong email or passoword');
			}
		} else {
			console.log('Wrong email or password');
		}
	};

	const logout = () => {
		setIsLogin(false);
		localStorage.removeItem('token');
		setToken(null);
	};

	return (
		<div>
			<form>
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