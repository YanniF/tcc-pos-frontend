import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import withStyles from '@material-ui/core/styles/withStyles';

import { auth } from './store/actions';

import Auth from './Auth';
import Navbar from './shared/components/Navbar';
import Courses from './Courses';
import CourseDetails from './Courses/CourseDetails';
import ViewTutorial from './Courses/ViewTutorial';
import AdminCourses from './Courses/admin/Courses';
import AdminDetails from './Courses/admin/Details';

const styles = (theme) => ({
	...theme.properties,
	container: {
		...theme.properties.container,
		marginTop: '5rem',
		marginBottom: '5rem',
	},
});

// axios.defaults.baseURL = 'https://europe-west1-yanni-scream.cloudfunctions.net/api';
axios.defaults.baseURL = 'http://localhost:5000/yanni-evoluindo/europe-west1/api';

function App(props) {
	const token = localStorage.FBIdToken;

	if (token) {
		const decodedToken = jwtDecode(token);

		if (decodedToken.exp * 1000 < Date.now()) {
			props.logout();
			window.location.href = '/login';
		}
		else {
			// move to actions
			axios.defaults.headers.common['Authorization'] = token;
			props.getUserData();
		}
	}

	let routes = (
		<div className={props.classes.container}>
			<Switch>
				<Route path="/" exact component={Auth} />
				<Redirect to="/" />
			</Switch>
		</div>
	);

	if (props.isAuthenticatedEmployee) {
		routes = (
			<div className={props.classes.container}>
				<Navbar />
				<Switch>
					<Route path="/courses" exact component={Courses} />
					<Route path="/courses/:courseId/details" exact component={CourseDetails} />
					<Route path="/courses/:courseId/tutorial" exact component={ViewTutorial} />
					<Redirect to="/courses" />
				</Switch>
			</div>
		);
	}
	else if (props.isAuthenticatedAdmin) {
		routes = (
			<div className={props.classes.container}>
				<Navbar />
				<Switch>
					<Route path="/admin/courses" exact component={AdminCourses} />
					<Route path="/admin/courses/:courseId/details/" exact component={AdminDetails} />
					<Redirect to="/admin/courses" />
				</Switch>
			</div>
		);
	}

	return <div>{routes}</div>;
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticatedEmployee: auth.user && !auth.user.admin,
	isAuthenticatedAdmin: auth.user && auth.user.admin,
});

const mapDispatchToProps = {
	logout: auth.logout,
	getUserData: auth.getUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
