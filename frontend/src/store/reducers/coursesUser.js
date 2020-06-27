import {
	SET_VISIBILITY_RATINGS_MODAL,
	SET_TOASTER_MESSAGE_USER,
	SET_SELECTED_COURSE,
	SET_HIDE_NAVBAR,
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
	REQUEST_GET_ENROLLED_COURSES,
	SUCCESS_GET_ENROLLED_COURSES,
	FAILED_GET_ENROLLED_COURSES,
	SUCCESS_SET_FINISHED_COURSE,
	FAILED_SET_FINISHED_COURSE,
	REQUEST_ADD_RATING,
	SUCCESS_ADD_RATING,
	FAILED_ADD_RATING,
	UPDATE_WATCHED_VIDEOS,
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
	isRequestingEnrolledCourses: false,
	hideNavbar: false,
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
		case SET_HIDE_NAVBAR:
			return {
				...state,
				hideNavbar: action.payload,
			};
		case SET_SELECTED_COURSE: {
			const enrolledCoursesIds = state.myCourses.map((course) => course.courseId);
			const selectedCourse = state.courses && state.courses.filter((course) => course.id === action.payload)[0];
			const hasFinishedCourse = state.myCourses.filter(
				(course) => selectedCourse.id === course.courseId && course.hasFinishedCourse,
			);

			return {
				...state,
				selectedCourse: {
					...selectedCourse,
					isEnrolled: enrolledCoursesIds.includes(selectedCourse.id),
					hasFinishedCourse: !!hasFinishedCourse.length,
				},
			};
		}
		case REQUEST_NEW_COURSES:
		case REQUEST_COURSE_DETAILS:
		case REQUEST_COURSE_RATINGS:
		case REQUEST_ADD_RATING:
		case REQUEST_ENROLL_COURSE:
		case REQUEST_GET_ENROLLED_COURSES:
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
		case SUCCESS_ENROLL_COURSE: {
			const updatedCourses = [ ...state.myCourses ];

			state.courses.forEach(
				(course) =>
					course.id === action.payload.courseId &&
					updatedCourses.push({
						title: course.title,
						thumbnail: course.thumbnail,
						description: course.description,
						teacher: course.teacher,
						category: course.category,
						numberOfRatings: course.numberOfRatings,
						rating: course.rating,
						...action.payload,
					}),
			);

			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					isEnrolled: true,
					hasFinishedCourse: false,
				},
				myCourses: updatedCourses,
				isRequestingEnrollCourse: false,
			};
		}
		case SUCCESS_GET_ENROLLED_COURSES: {
			const myCourses = action.payload.map((myCourse) => {
				let courses = [];
				state.courses.forEach((course) => {
					if (myCourse.courseId === course.id)
						courses.push({
							title: course.title,
							thumbnail: course.thumbnail,
							description: course.description,
							teacher: course.teacher,
							category: course.category,
							numberOfRatings: course.numberOfRatings,
							rating: course.rating,
							...myCourse,
						});
				});

				return courses && courses[0];
			});

			return {
				...state,
				myCourses: myCourses,
				isRequestingEnrolledCourses: false,
			};
		}
		case SUCCESS_SET_FINISHED_COURSE:
			return {
				...state,
				selectedCourse: {
					...state.selectedCourse,
					hasFinishedCourse: action.payload,
				},
				myCourses: state.myCourses.map(
					(course) =>
						course.courseId === state.selectedCourse.id ? { ...course, hasFinishedCourse: action.payload } : course,
				),
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
		case UPDATE_WATCHED_VIDEOS: {
			const updatedCourses = state.myCourses.map(
				(course) =>
					course.courseId === action.payload.id ? { ...course, finishedVideos: action.payload.videos } : course,
			);

			return {
				...state,
				myCourses: updatedCourses,
			};
		}
		case FAILED_GET_NEW_COURSES:
		case FAILED_GET_COURSE_DETAILS:
		case FAILED_GET_COURSE_RATINGS:
		case FAILED_ADD_RATING:
		case FAILED_ENROLL_COURSE:
		case FAILED_GET_ENROLLED_COURSES:
		case FAILED_SET_FINISHED_COURSE:
			return {
				...state,
				errors: action.payload,
				isRequestingNewCourses: false,
				isRequestingCourseDetails: false,
				isRequestingEnrollCourse: false,
				isRequestingRatings: false,
				isRequestingEnrolledCourses: false,
			};
		default:
			return state;
	}
};

export default coursesUser;
