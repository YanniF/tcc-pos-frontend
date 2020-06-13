import { AUTH_START, AUTH_FAILED, AUTH_CLEAR_ERRORS, SET_USER, SET_UNAUTHENTICATED } from '../types';

const initialState = {
	user: null,
	errors: null,
	loading: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_START:
			return {
				...state,
				loading: true,
				errors: null,
			};
		case AUTH_FAILED:
			return {
				...state,
				loading: false,
				errors: action.payload,
			};
		case AUTH_CLEAR_ERRORS:
			return {
				...state,
				errors: null,
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
