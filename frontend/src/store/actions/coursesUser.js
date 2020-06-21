import axios from 'axios';

import {
	SET_VISIBILITY_RATINGS_MODAL,
	SET_TOASTER_MESSAGE_USER,
	REQUEST_NEW_COURSES,
	SUCCESS_GET_NEW_COURSES,
	FAILED_GET_NEW_COURSES,
	REQUEST_COURSE_DETAILS,
	SUCCESS_GET_COURSE_DETAILS,
	FAILED_GET_COURSE_DETAILS,
	REQUEST_COURSE_RATINGS,
	SUCCESS_GET_COURSE_RATINGS,
	FAILED_GET_COURSE_RATINGS,
	REQUEST_ADD_RATING,
	SUCCESS_ADD_RATING,
	FAILED_ADD_RATING,
} from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const setVisibilityRatingsModal = (open) => (dispatch) => {
	dispatch(actionCreator(SET_VISIBILITY_RATINGS_MODAL, open));
};

export const setToasterMessage = (value) => (dispatch) => {
	dispatch(actionCreator(SET_TOASTER_MESSAGE_USER, value));
};

export const getNewCourses = () => (dispatch) => {
	dispatch(actionCreator(REQUEST_NEW_COURSES, { key: 'isRequestingNewCourses' }));

	axios
		.get('/newcourses')
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_NEW_COURSES, res.data));
		})
		.catch((err) => dispatch(actionCreator(FAILED_GET_NEW_COURSES, err.response.data)));
};

export const getCourseDetails = (id) => (dispatch) => {
	dispatch(actionCreator(REQUEST_COURSE_DETAILS, { key: 'isRequestingCourseDetails' }));

	axios
		.get(`/course/${id}/details`)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_COURSE_DETAILS, res.data));
			dispatch(getAllRatingsByCourse(id));
		})
		.catch((err) => dispatch(actionCreator(FAILED_GET_COURSE_DETAILS, err.response.data)));
};

export const getAllRatingsByCourse = (id) => (dispatch) => {
	dispatch(actionCreator(REQUEST_COURSE_RATINGS, { key: 'isRequestingRatings' }));

	axios
		.get(`/courses/${id}/ratings`)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_COURSE_RATINGS, res.data));
		})
		.catch((err) => dispatch(actionCreator(FAILED_GET_COURSE_RATINGS, err.response.data)));
};

export const addRating = (courseId, rating) => (dispatch) => {
	dispatch(actionCreator(REQUEST_ADD_RATING, { key: 'isRequestingRatings' }));

	axios
		.post(`/courses/${courseId}/ratings`, rating)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_RATING, res.data));
			dispatch(setToasterMessage('Cadastro realizado'));
		})
		.catch((err) => dispatch(actionCreator(FAILED_ADD_RATING, err.response.data)));
};
