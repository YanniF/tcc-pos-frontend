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

import { calcRatingValue } from '../../shared/util/utility';
// console.log(calcRatingValue([ 5, 0, 0, 2, 0 ])); ///////////////////////////////// TODO

const initialState = {
	courses: [],
	selectedCourse: null,
	isOpenRatingsModal: false,
	isRequestingNewCourses: true,
	isRequestingCourseDetails: false,
	isRequestingRatings: false,
	message: '',
	errors: null,
};

// console.log(calcRatingValue(state.selectedCourse.ratings.map((r) => r.rating)));
const coursesUser = (state = initialState, action) => {
	switch (action.type) {
		case SET_VISIBILITY_RATINGS_MODAL:
			return {
				...state,
				isOpenRatingsModal: action.payload,
			};
		case SET_TOASTER_MESSAGE_USER:
			return {
				...state,
				message: action.payload,
			};
		case REQUEST_NEW_COURSES:
		case REQUEST_COURSE_DETAILS:
		case REQUEST_COURSE_RATINGS:
		case REQUEST_ADD_RATING:
			return {
				...state,
				[action.payload.key]: true,
			};
		case SUCCESS_GET_NEW_COURSES:
			return {
				...state,
				courses: action.payload,
				isRequestingNewCourses: false,
			};
		case SUCCESS_GET_COURSE_DETAILS:
			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					...action.payload,
				},
				isRequestingCourseDetails: false,
			};
		case SUCCESS_GET_COURSE_RATINGS:
			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					ratings: action.payload,
				},
				isRequestingRatings: false,
			};
		case SUCCESS_ADD_RATING: {
			const newNumberOfRatings = state.selectedCourse.numberOfRatings + 1;
			const newRatings = [ ...state.selectedCourse.ratings ];
			newRatings.push(action.payload);

			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					numberOfRatings: newNumberOfRatings,
					rating: (state.selectedCourse.rating + action.payload.rating) / newNumberOfRatings,
					ratings: newRatings,
				},
				isOpenRatingsModal: false,
				isRequestingRatings: false,
			};
		}
		case FAILED_GET_NEW_COURSES:
		case FAILED_GET_COURSE_DETAILS:
		case FAILED_GET_COURSE_RATINGS:
		case FAILED_ADD_RATING:
			return {
				...state,
				errors: action.payload,
				isRequestingNewCourses: false,
				isRequestingCourseDetails: false,
				isRequestingRatings: false,
			};
		default:
			return state;
	}
};

export default coursesUser;
