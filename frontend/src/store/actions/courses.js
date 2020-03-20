import axios from 'axios';

import {
	SET_VISIBILITY_COURSE_MODAL,
	IS_REQUESTING_COURSES,
	SUCCESS_GET_COURSES,
	FAILED_GET_COURSES,
	REQUEST_ADD_COURSE,
	SUCCESS_ADD_COURSE,
	FAILED_ADD_COURSE,
} from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const setModalVisibility = (open) => (dispatch) => {
	dispatch(actionCreator(SET_VISIBILITY_COURSE_MODAL, open));
};

export const getAllCourses = () => (dispatch) => {
	dispatch(actionCreator(IS_REQUESTING_COURSES));

	axios
		.get('/admin/courses')
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_COURSES, res.data));
		})
		.catch((err) => dispatch(actionCreator(FAILED_GET_COURSES, err)));
};

export const addCourse = (course, history) => (dispatch) => {
	dispatch(actionCreator(REQUEST_ADD_COURSE));

	axios
		.post('/admin/courses', course)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_COURSE, res.data));
			history.push(`/admin/courses/${res.data.id}/details`);
		})
		.catch((err) => dispatch(actionCreator(FAILED_ADD_COURSE, err)));
};
