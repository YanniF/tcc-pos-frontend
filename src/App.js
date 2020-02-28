import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Auth from './Auth';
import Navbar from './shared/components/NavBar'
import Courses from './Courses';
import Profile from './User/Profile'

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
					<Route path="/profile" exact component={Profile} />
					<Redirect to="/courses" />
				</Switch>
			</div>
		);
	}

	return <div>{routes}</div>;
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticatedEmployee: auth.token !== null,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
