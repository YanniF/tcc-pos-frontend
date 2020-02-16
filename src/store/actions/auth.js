import { AUTH_START, AUTH_SUCCESS } from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const authStart = () => (dispatch) => {
	dispatch(actionCreator(AUTH_START));

	setTimeout(() => {
		dispatch(actionCreator(AUTH_SUCCESS));
	}, 100);
};
