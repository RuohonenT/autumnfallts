import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../controllers/fetchFunctions';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState([]);
	const history = useHistory();

	const handleSubmit = async (e, email, password) => {
		e.preventDefault();
		const signUpResult = await signUp(email, password);
		const data = await signUpResult;
		if (data.status === 200) {
			console.log(data.data.msg);
			setErrorMessage([]);
			setEmail('');
			setPassword('');
			history.push('/login');
		} else {
			const errorMessages = data.errors.map(error => error.msg);
			setErrorMessage(errorMessages);
			console.log('signUpResult', signUpResult);
		}
		// else { console.log('error', data.status) }
	};
	return (
		<div>
			<div>
				<form>
					<h2>Luo uusi tili</h2>
					<div>
						<input
							type='text'
							name='email'
							placeholder='email'
							onChange={e => setEmail(e.target.value)} />
					</div>
					<div>
						<input
							type='password'
							name='password'
							placeholder='password'
							onChange={e => setPassword(e.target.value)} />
						<p>{errorMessage}</p>
						<button
							onClick={e => handleSubmit(e, email, password)}>REGISTER</button>
					</div>
				</form>
			</div>
		</div>
	)
};

export default SignUp;
