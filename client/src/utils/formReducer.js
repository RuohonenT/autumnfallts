import { v4 as uuidv4 } from 'uuid';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'handleInputChange':
			return {
				...state,
				[action.field]: action.payload
			};

		case 'handleTitleChange':
			return {
				...state,
				[action.field]: [action.payload]
			}

		default:
			return state;
	}
};

export default formReducer;