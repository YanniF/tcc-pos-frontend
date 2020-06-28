import axios from 'axios';
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

const actionCreator = (type, payload) => ({
	type,
	payload,
});

const setAuthorizationHeader = (token) => {
	const FBIdToken = `Bearer ${token}`;
	localStorage.setItem('FBIdToken', FBIdToken);
	axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const setUserData = ({ user_id: userId, admin, email }) => (dispatch) => {
	const data = {
		userId,
		admin,
		email,
	};
	dispatch(actionCreator(SET_USER, data));
};

export const getUserAdditionalData = () => (dispatch) => {
	axios
		.get('/user')
		.then((res) => {
			dispatch(actionCreator(SET_ADDITIONAL_DATA_USER, res.data.credentials));
		})
		.catch((err) => err.response.data);
};

export const clearAuthErrors = () => (dispatch) => {
	dispatch(actionCreator(AUTH_CLEAR_ERRORS));
};

export const login = (user) => (dispatch) => {
	dispatch(actionCreator(AUTH_START));
	axios
		.post('/login', user)
		.then((res) => {
			setAuthorizationHeader(res.data.token);
			dispatch(setUserData(res.data.token));
			dispatch(getUserAdditionalData());
			dispatch(clearAuthErrors());
			// dispatch(actionCreator(AUTH_SUCCESS, res.data.loggedUser));
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
			dispatch(setUserData(res.data.token));
			dispatch(getUserAdditionalData());
			dispatch(clearAuthErrors());
			// history.push('/');
		})
		.catch((err) => {
			dispatch(actionCreator(AUTH_FAILED, err.response.data));
		});
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('FBIdToken');
	delete axios.defaults.headers.common['Authorization'];

	dispatch({ type: SET_UNAUTHENTICATED });
};

export const getNotifications = () => (dispatch) => {
	dispatch(actionCreator(REQUEST_GET_NOTIFICATIONS));

	axios
		.get('/admin/notifications')
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_NOTIFICATIONS, res.data));
		})
		.catch((err) => {
			dispatch(actionCreator(FAILED_GET_NOTIFICATIONS, err.response.data));
		});
};
