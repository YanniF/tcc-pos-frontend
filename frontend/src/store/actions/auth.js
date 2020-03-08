import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS } from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const login = (user) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));
	axios
		.post('/login', user)
		.then((res) => {
			console.log(res.data);

			// setAuthorizationHeader(res.data.token);
			// dispatch(getUserData());
			// dispatch({ type: CLEAR_ERRORS });
			// history.push('/');
		})
		.catch((err) => {
			/* dispatch({
			type: SET_ERRORS,
			payload: err.response.data,
		}); */
		});
};

export const signupUser = (newUserData) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));

	axios
		.post('/signup', newUserData)
		.then((res) => {
			console.log(res.data);

			// setAuthorizationHeader(res.data.token);
			// dispatch(getUserData());
			// dispatch({ type: CLEAR_ERRORS });
			// history.push('/');
		})
		.catch((err) => {
			/* dispatch({
				type: SET_ERRORS,
				payload: err.response.data,
			}); */
		});
};
