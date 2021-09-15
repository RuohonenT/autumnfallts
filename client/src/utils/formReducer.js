import { v4 as uuidv4 } from 'uuid';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'handleInputChange':
			return {
				...state,
				[action.field]: action.name
			};

		case 'handleTitleChange':
			return {
				...state,
				tracktitles: [...state.tracktitles, { id: uuidv4(), name: action.name }],
				hasError: false
			};

		case 'editTitle':
			return {
				...state,
				tracktitles: [...state.tracktitles.map(title =>
					title.name === action.name)]
			}


		case 'removeTitle':
			return {
				...state,
				tracktitles: state.tracktitles.filter((_, idx) => idx !== action.idx),
			};

		case 'clear':
			return {
				...state,
				albumtitle: { value: '', hasError: true },
				tracktitles: [],
				year: { value: '', hasError: true },
				description: { value: '', hasError: true },
				hasError: true
			};

		default:
			return state;
	};
};

export default formReducer;