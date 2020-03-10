import { AUTH_START, SET_USER, SET_UNAUTHENTICATED } from '../types';

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
		case SET_USER:
			return {
				...state,
				user: action.payload.credentials,
				loading: false,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
