import React, { useReducer } from 'react';
import DiscoInput from '../DiscoInput/DiscoInput';

const useForm = (initialValues, onSubmit) => {
	const [state, dispatch] = useReducer(formReducer, initialValues);

	const changeHandler = ({target: {value, id}}) => {
		const updatedElement = {...state[id]};
		updatedElement.value = value;
		dispatch({id, updatedElement})
	};

	const submitHandler = e => {
		e.preventDefault();
		const results = Object.keys(state).reduce((final, key) => {
			final[key] = state[key].value;
			return final;
		}, {});
		onSubmit(results)
	}

	return {state, submitHandler, changeHandler}
}

	const formReducer = (prevState, {id, updatedElement }) => {
		return { ...prevState, [id]: updatedElement };
	};


	return (
		<div>
			<form>
				{Object.keys(state).map(key => (
					<DiscoInput
						changed={({ target: { value } }) => dispatch({ value, key })}
						key={key}
						id={key}
						value={state[key].value}
						label={state[key].label}
					/>
				))}
			</form>
		</div>
	);
};

export default DiscoForm;
