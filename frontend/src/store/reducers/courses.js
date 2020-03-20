import {
	SET_VISIBILITY_COURSE_MODAL,
	IS_REQUESTING_COURSES,
	SUCCESS_GET_COURSES,
	FAILED_GET_COURSES,
	REQUEST_ADD_COURSE,
	SUCCESS_ADD_COURSE,
	FAILED_ADD_COURSE,
} from '../types';

const initialState = {
	courses: [],
	courseModalOpen: false,
	error: null,
	loading: false,
	isRequestingCourses: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY_COURSE_MODAL:
			return {
				...state,
				courseModalOpen: action.payload,
			};
		case IS_REQUESTING_COURSES:
			return {
				...state,
				isRequestingCourses: true,
			};
		case SUCCESS_GET_COURSES:
			return {
				...state,
				courses: action.payload,
			};
		case REQUEST_ADD_COURSE:
			return {
				...state,
				loading: true,
			};
		case SUCCESS_ADD_COURSE:
			return {
				...state,
				courses: [ ...state.courses, action.payload ],
				loading: false,
				courseModalOpen: false,
			};
		case FAILED_GET_COURSES:
		case FAILED_ADD_COURSE:
			return {
				error: action.payload,
				loading: false,
				isRequestingCourses: false,
			};
		default:
			return state;
	}
};

export default reducer;
