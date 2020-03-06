import { AUTH_START, AUTH_SUCCESS } from '../types';

const initialState = {
	token: null,
	userId: null,
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
				token: '123',
				loading: false,
			};
		default:
			return state;
	}
};

export default reducer;
