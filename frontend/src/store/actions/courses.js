import axios from 'axios';

import {
	SET_VISIBILITY_COURSE_MODAL,
	SET_VISIBILITY_DELETE_MODAL,
	SET_TOASTER_MESSAGE,
	CLEAR_COURSE_ERRORS,
	SELECT_COURSE,
	UNSELECT_COURSE,
	IS_REQUESTING_COURSES,
	SUCCESS_GET_COURSES,
	FAILED_GET_COURSES,
	IS_REQUESTING_COURSE,
	SUCCESS_GET_COURSE,
	FAILED_GET_COURSE,
	REQUEST_ADD_COURSE,
	SUCCESS_ADD_COURSE,
	FAILED_ADD_COURSE,
	REQUEST_EDIT_COURSE,
	SUCCESS_EDIT_COURSE,
	FAILED_EDIT_COURSE,
	REQUEST_DELETE_COURSE,
	SUCCESS_DELETE_COURSE,
	FAILED_DELETE_COURSE,
	REQUEST_ADD_CONTENT,
	SUCCESS_ADD_CONTENT,
	FAILED_ADD_CONTENT,
} from '../types';

const actionCreator = (type, payload) => ({
	type,
	payload,
});

export const setModalVisibility = (open) => (dispatch) => {
	dispatch(actionCreator(SET_VISIBILITY_COURSE_MODAL, open));
};

export const setModalDeleteVisibility = (open, id) => (dispatch) => {
	if (id) {
		dispatch(actionCreator(SELECT_COURSE, id));
	}
	dispatch(actionCreator(SET_VISIBILITY_DELETE_MODAL, open));
};

export const setToasterMessage = (value) => (dispatch) => {
	dispatch(actionCreator(SET_TOASTER_MESSAGE, value));
};

export const clearCourseErrors = () => (dispatch) => {
	dispatch(actionCreator(CLEAR_COURSE_ERRORS));
};

export const unselectCourse = () => (dispatch) => {
	dispatch(actionCreator(UNSELECT_COURSE));
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

export const getCourse = (id) => (dispatch) => {
	dispatch(actionCreator(IS_REQUESTING_COURSE));

	axios
		.get(`/admin/courses/${id}`)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_GET_COURSE, res.data));
		})
		.catch((err) => dispatch(actionCreator(FAILED_GET_COURSE, err.message)));
};

export const addCourse = (course, history) => (dispatch) => {
	dispatch(actionCreator(REQUEST_ADD_COURSE));

	axios
		.post('/admin/courses', course)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_COURSE, res.data));
			dispatch(getCourse(res.data.id));
			history.push(`/admin/courses/${res.data.id}/details`);
		})
		.catch((err) => dispatch(actionCreator(FAILED_ADD_COURSE, err.response.data)));
};

export const editCourse = (course) => (dispatch) => {
	dispatch(actionCreator(REQUEST_EDIT_COURSE));

	axios
		.put(`/admin/courses/${course.id}`, course)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_EDIT_COURSE, course));
			dispatch(setToasterMessage(res.data.message));
		})
		.catch((err) => dispatch(actionCreator(FAILED_EDIT_COURSE, err.response.data)));
};

export const deleteCourse = (id) => (dispatch) => {
	dispatch(actionCreator(REQUEST_DELETE_COURSE));

	axios
		.delete(`/admin/courses/${id}`)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_DELETE_COURSE, id));
			dispatch(setToasterMessage(res.data.message));
		})
		.catch((err) => dispatch(actionCreator(FAILED_DELETE_COURSE, err.response.data)));
};

export const addContent = (type, courseId, content) => (dispatch) => {
	dispatch(actionCreator(REQUEST_ADD_CONTENT));
	let endpoint;
	// let moduleId = content.module || content.get('module');
	let moduleId = content.module;

	if (type === 'modules') {
		endpoint = `/admin/courses/${courseId}/${type}`;
	}
	else {
		endpoint = `/admin/courses/${courseId}/modules/${moduleId}/${type}`;
	}

	axios
		.post(endpoint, content)
		.then((res) => {
			dispatch(actionCreator(SUCCESS_ADD_CONTENT, { key: type, data: res.data }));
		})
		.catch((err) => dispatch(actionCreator(FAILED_ADD_CONTENT, err)));
};
