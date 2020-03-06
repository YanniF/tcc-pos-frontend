import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Auth from './Auth';
import Navbar from './shared/components/Navbar';
import Courses from './Courses';
import CourseDetails from './Courses/CourseDetails';
import ViewTutorial from './Courses/ViewTutorial';
import AdminCourses from './Courses/admin/Courses';

const styles = (theme) => ({
	...theme.properties,
	container: {
		...theme.properties.container,
		marginTop: '5rem',
		marginBottom: '5rem',
	},
});

function App(props) {
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
					<Redirect to="/admin/courses" />
				</Switch>
			</div>
		);
	}

	return <div>{routes}</div>;
}

const mapStateToProps = ({ auth }) => ({
	// isAuthenticatedEmployee: auth.token !== null,
	isAuthenticatedAdmin: auth.token !== null,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
