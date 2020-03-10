import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILED, SET_USER, SET_UNAUTHENTICATED, AUTH_CLEAR_ERRORS, LOADING_USER } from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const getUserData = () => (dispatch) => {
	// dispatch({ type: LOADING_USER });
	axios
		.get('/user')
		.then((res) => {
			dispatch(actionCreator(SET_USER, res.data));
		})
		.catch((err) => console.log(err));
};

export const login = (user) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));
	axios
		.post('/login', user)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
			// dispatch(actionCreator(AUTH_SUCCESS, res.data.loggedUser));
			// dispatch(actionCreator(AUTH_CLEAR_ERRORS));
			// history.push('/');
		})
		.catch((err) => {
			dispatch(actionCreator(AUTH_FAILED, err.response.data));
		});
};

export const signupUser = (newUserData) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));

	axios
		.post('/signup', newUserData)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(getUserData());
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

export const logout = () => (dispatch) => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];

	dispatch({ type: SET_UNAUTHENTICATED });
};
