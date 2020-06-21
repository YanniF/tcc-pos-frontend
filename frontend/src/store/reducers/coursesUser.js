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

const initialState = {
	courses: [],
	selectedCourse: null,
	myCourses: [],
	isOpenRatingsModal: false,
	isRequestingNewCourses: true,
	isRequestingCourseDetails: false,
	isRequestingEnrollCourse: false,
	isRequestingRatings: false,
	message: '',
	errors: null,
};

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
		case REQUEST_ENROLL_COURSE:
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
		case SUCCESS_ENROLL_COURSE:
			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					isEnrolled: true,
				},
				isRequestingEnrollCourse: false,
			};
		case SUCCESS_GET_COURSE_RATINGS:
			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					rating: calcRatingValue(action.payload.map((r) => r.rating)),
					ratings: action.payload,
				},
				isRequestingRatings: false,
			};
		case SUCCESS_ADD_RATING: {
			const newNumberOfRatings = state.selectedCourse.numberOfRatings + 1;
			const newRatings = [ ...state.selectedCourse.ratings ];
			newRatings.push(action.payload);

			const newCourseRating = calcRatingValue(newRatings.map((r) => r.rating));

			const newCourses = state.courses.map(
				(course) =>
					course.id === state.selectedCourse.id
						? { ...course, rating: newCourseRating, numberOfRatings: newNumberOfRatings }
						: course,
			);

			return {
				...state,
				courses: newCourses,
				selectedCourse: {
					...state.selectedCourse,
					numberOfRatings: newNumberOfRatings,
					rating: newCourseRating,
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
		case FAILED_ENROLL_COURSE:
			return {
				...state,
				errors: action.payload,
				isRequestingNewCourses: false,
				isRequestingCourseDetails: false,
				isRequestingEnrollCourse: false,
				isRequestingRatings: false,
			};
		default:
			return state;
	}
};

export default coursesUser;
