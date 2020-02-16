import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './Auth/Auth';
import Courses from './Employee/Courses';
import './App.css';

function App(props) {
	let routes = (
		<Switch>
			<Route path="/" exact component={Auth} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticatedEmployee) {
		routes = (
			<Switch>
				<Route path="/courses" component={Courses} />
				<Redirect to="/courses" />
			</Switch>
		);
	}

	return <div>{routes}</div>;
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticatedEmployee: auth.token !== null,
});

export default connect(mapStateToProps)(App);
