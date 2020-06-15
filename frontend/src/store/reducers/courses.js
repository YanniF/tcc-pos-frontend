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
	REQUEST_EDIT_CONTENT,
	SUCCESS_EDIT_CONTENT,
	FAILED_EDIT_CONTENT,
	REQUEST_DELETE_CONTENT,
	SUCCESS_DELETE_CONTENT,
	FAILED_DELETE_CONTENT,
} from '../types';

const initialState = {
	courses: [],
	selectedCourse: null,
	courseModalOpen: false,
	deleteModalOpen: false,
	errors: null,
	message: '',
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
		case SET_VISIBILITY_DELETE_MODAL:
			return {
				...state,
				deleteModalOpen: action.payload,
			};
		case SET_TOASTER_MESSAGE:
			return {
				...state,
				message: action.payload,
			};
		case CLEAR_COURSE_ERRORS:
			return {
				...state,
				errors: null,
			};
		case SELECT_COURSE:
			return {
				...state,
				selectedCourse: state.courses.filter((course) => course.id === action.payload)[0],
			};
		case UNSELECT_COURSE:
			return {
				...state,
				selectedCourse: null,
			};
		case IS_REQUESTING_COURSES:
		case IS_REQUESTING_COURSE:
			return {
				...state,
				isRequestingCourses: true,
			};
		case SUCCESS_GET_COURSES:
			return {
				...state,
				courses: action.payload,
				isRequestingCourses: false,
			};
		case SUCCESS_GET_COURSE:
			return {
				...state,
				selectedCourse: action.payload,
				isRequestingCourses: false,
			};
		case REQUEST_ADD_COURSE:
		case REQUEST_EDIT_COURSE:
		case REQUEST_DELETE_COURSE:
		case REQUEST_ADD_CONTENT:
		case REQUEST_EDIT_CONTENT:
		case REQUEST_DELETE_CONTENT:
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
		case SUCCESS_EDIT_COURSE:
			return {
				...state,
				loading: false,
				courses: state.courses.map((course) => (course.id === action.payload.id ? action.payload : course)),
				selectedCourse: {
					...state.selectedCourse,
					...action.payload,
				},
				courseModalOpen: false,
			};
		case SUCCESS_DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== action.payload),
				loading: false,
				deleteModalOpen: false,
			};
		case SUCCESS_ADD_CONTENT: {
			const { key, data } = action.payload;

			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					[key]: [ ...state.selectedCourse[key], data ],
				},
				loading: false,
			};
		}
		case SUCCESS_EDIT_CONTENT: {
			const { key, data } = action.payload;

			return {
				...state,
				loading: false,
				selectedCourse: {
					...state.selectedCourse,
					[key]: state.selectedCourse[key].map((item) => (item.id === data.id ? data : item)),
				},
			};
		}
		case SUCCESS_DELETE_CONTENT: {
			const { key, id } = action.payload;

			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					[key]: state.selectedCourse[key].filter((item) => item.id !== id),
				},
				loading: false,
				deleteModalOpen: false,
			};
		}
		case FAILED_GET_COURSES:
		case FAILED_ADD_COURSE:
		case FAILED_GET_COURSE:
		case FAILED_EDIT_COURSE:
		case FAILED_DELETE_COURSE:
		case FAILED_ADD_CONTENT:
		case FAILED_EDIT_CONTENT:
		case FAILED_DELETE_CONTENT:
			return {
				...state,
				errors: action.payload,
				loading: false,
				isRequestingCourses: false,
			};
		default:
			return state;
	}
};

export default reducer;
