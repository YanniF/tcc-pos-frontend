import {
	AUTH_START,
	AUTH_FAILED,
	AUTH_CLEAR_ERRORS,
	SET_USER,
	SET_UNAUTHENTICATED,
	SET_ADDITIONAL_DATA_USER,
	REQUEST_GET_NOTIFICATIONS,
	SUCCESS_GET_NOTIFICATIONS,
	FAILED_GET_NOTIFICATIONS,
} from '../types';

const initialState = {
	user: null,
	errors: null,
	loading: false,
	notifications: [],
	isRequestingNotifications: false,
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
				user: action.payload,
				loading: false,
			};
		case SET_ADDITIONAL_DATA_USER:
			return {
				...state,
				user: { ...state.user, name: action.payload.name },
				loading: false,
			};
		case REQUEST_GET_NOTIFICATIONS:
			return {
				...state,
				isRequestingNotifications: true,
			};
		case SUCCESS_GET_NOTIFICATIONS:
			return {
				...state,
				notifications: action.payload,
				isRequestingNotifications: false,
			};
		case FAILED_GET_NOTIFICATIONS:
			return {
				...state,
				errors: action.payload,
				isRequestingNotifications: false,
			};
		case SET_UNAUTHENTICATED:
			return initialState;
		default:
			return state;
	}
};

export default reducer;
