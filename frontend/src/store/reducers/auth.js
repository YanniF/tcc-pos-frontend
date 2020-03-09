import { AUTH_START, AUTH_SUCCESS } from '../types';

const initialState = {
	user: null,
	error: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				loading: true,
			};
		case AUTH_SUCCESS:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
