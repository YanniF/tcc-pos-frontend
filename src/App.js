import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';

import Auth from './Auth';
import Courses from './Courses';

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
			<Switch>
				<Route path="/courses" exact component={Courses} />
				<Redirect to="/courses" />
			</Switch>
		);
	}

	return <div>{routes}</div>;
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticatedEmployee: auth.token !== null,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
