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
				tracktitles: [...state.tracktitles, { id: state.tracktitles.length, name: action.name }]
			}

		default:
			return state;
	}
};

export default formReducer;