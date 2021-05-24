import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../controllers/fetchFunctions';

const SignUp = props => {
	const { closeSignupModal } = props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState([]);
	const history = useHistory();

	const handleSubmit = async (e, email, password) => {
		e.preventDefault();
		const signUpResult = await signUp(email, password);
		const data = await signUpResult;
		if (data.errors) {
			const errorMessages = data.errors.map(err => err.msg);
			setErrorMessage(errorMessages);
			console.log('signUpResult', data.errors);
		}
		//sulkee modaalin
		if (signUpResult.status === 200) {
			console.log(data.data.msg);
			setErrorMessage([]);
			setEmail('');
			setPassword('');
			// closeSignUpModal();
			history.push('/');
		}
		else { console.log('erroria') }
	};
	return (
		<div>
			<div className="signup__close" onClick={closeSignupModal}>
				<i className="fa fa-times"></i>
			</div>
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
						<p>{errorMessage[0]}</p>
						<button
							onClick={e => handleSubmit(e, email, password)}>REGISTER</button>
					</div>
				</form>
			</div>
		</div>
	)
};

export default SignUp;
