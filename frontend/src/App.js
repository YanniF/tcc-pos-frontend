import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import withStyles from '@material-ui/core/styles/withStyles';

import { auth } from './store/actions';

import Auth from './Auth';
import Navbar from './shared/components/Navbar';
import MyCourses from './Courses/MyCourses';
import Home from './Courses/Home';
import CourseDetails from './Courses/CourseDetails';
import ViewTutorial from './Courses/ViewTutorial';
import AdminCourses from './Courses/admin/Courses';
import AdminDetails from './Courses/admin/Details';
import Certificate from './Courses/Certificate';

const styles = (theme) => ({
	...theme.properties,
	container: {
		...theme.properties.container,
		marginTop: '5rem',
		marginBottom: '5rem',
	},
});

axios.defaults.baseURL = 'https://europe-west1-yanni-evoluindo.cloudfunctions.net/api';
// axios.defaults.baseURL = 'http://localhost:5000/yanni-evoluindo/europe-west1/api';

function App(props) {
	const token = localStorage.FBIdToken;

	if (token) {
		const decodedToken = jwtDecode(token);

		if (decodedToken.exp * 1000 < Date.now()) {
			props.logout();
			window.location.href = '/login';
		}
		else {
			axios.defaults.headers.common['Authorization'] = token;
			props.setUserData(decodedToken);
			props.getUserAdditionalData();
		}
	}

	let routes;

	if (props.isAuthenticatedEmployee) {
		routes = (
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/courses" exact component={MyCourses} />
				<Route path="/courses/:courseId/details" exact component={CourseDetails} />
				<Route path="/courses/:courseId/tutorial" exact component={ViewTutorial} />
				<Route path="/courses/:courseId/certificate" exact component={Certificate} />
				<Redirect to="/" />
			</Switch>
		);
	}
	else if (props.isAuthenticatedAdmin) {
		routes = (
			<Switch>
				<Route path="/admin/courses" exact component={AdminCourses} />
				<Route path="/admin/courses/:courseId/details/" exact component={AdminDetails} />
				<Route path="/courses/:courseId/details" exact component={CourseDetails} />
				<Redirect to="/admin/courses" />
			</Switch>
		);
	}
	else {
		return (
			<div className={props.classes.container}>
				<Switch>
					<Route path="/auth" exact component={Auth} />
					<Redirect to="/auth" />
				</Switch>
			</div>
		);
	}

	return (
		<div className={props.classes.container}>
			<Navbar isAdmin={props.isAuthenticatedAdmin} />
			{routes}
		</div>
	);
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticatedEmployee: auth.user && !auth.user.admin,
	isAuthenticatedAdmin: auth.user && auth.user.admin,
});

const mapDispatchToProps = {
	logout: auth.logout,
	setUserData: auth.setUserData,
	getUserAdditionalData: auth.getUserAdditionalData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
