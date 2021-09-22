import { v4 as uuidv4 } from 'uuid';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'handleInputChange':
			return {
				...state,
				[action.field]: action.name
			};

		case 'addTitle':
			return {
				...state,
				tracktitles: [...state.tracktitles, { id: uuidv4(), name: action.name }],
				hasError: false
			};

		case 'removeTitle':
			return {
				...state,
				tracktitles: [...state.tracktitles.filter((_, idx) => idx !== action.idx)]
			};


		case 'editTitle':
			console.log(action.payload)
			return {
				...state,
				tracktitles: state.tracktitles.map(title => {
					if (title.id === action.idx) {
						return { ...title, ...action.payload };
					} else {
						return title;
					}
				})
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