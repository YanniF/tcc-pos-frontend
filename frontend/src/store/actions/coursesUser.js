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
	REQUEST_ENROLL_COURSE,
	SUCCESS_ENROLL_COURSE,
	FAILED_ENROLL_COURSE,
	REQUEST_ADD_RATING,
	SUCCESS_ADD_RATING,
	FAILED_ADD_RATING,
} from '../types';

import { calcRatingValue } from '../../shared/util/utility';

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
		.get(`/courses/${id}/details`)
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

export const enrollInCourse = () => (dispatch, getState) => {
	dispatch(actionCreator(REQUEST_ENROLL_COURSE, { key: 'isRequestingEnrollCourse' }));

	const { coursesUser: { selectedCourse = {} } } = getState();

	axios
		.post(`/courses/${selectedCourse.id}/enroll`)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ENROLL_COURSE, res.data));
			dispatch(setToasterMessage('Matrícula realizada'));
		})
		.catch((err) => dispatch(actionCreator(FAILED_ENROLL_COURSE, err.response.data)));
};

export const addRating = (courseId, rating) => (dispatch, getState) => {
	dispatch(actionCreator(REQUEST_ADD_RATING, { key: 'isRequestingRatings' }));

	const { coursesUser: { selectedCourse = {} } } = getState();

	const newRating = {
		...rating,
		courseRating:
			selectedCourse.ratings.length === 0
				? rating.rating
				: calcRatingValue(selectedCourse.ratings.map((r) => r.rating)),
	};

	axios
		.post(`/courses/${courseId}/ratings`, newRating)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_RATING, res.data));
			dispatch(setToasterMessage('Cadastro realizado'));
		})
		.catch((err) => dispatch(actionCreator(FAILED_ADD_RATING, err.response.data)));
};
