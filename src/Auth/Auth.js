import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../store/actions';
import Login from './Login';
import Register from './Register';
import Image from '../shared/components/SVG/illustrations/Remotely';
import Logo from '../shared/components/Logo/Logo';
import classes from './Auth.module.scss';

function Auth(props) {
	const [ showLogin, setShowLogin ] = useState(true);

	if (props.isAuthenticatedEmployee) {
		return <Redirect to="/courses" />;
	}

	return (
		<div className={classes.auth}>
			<nav>
				<Logo />
			</nav>
			<div className={classes.forms}>
				<Image width="75rem" height="75rem" />
				{showLogin ? (
					<Login
						showLogin={showLogin}
						changeForm={() => setShowLogin(false)}
						loading={props.loading}
						authStart={props.authStart}
					/>
				) : (
					<Register
						showRegister={!showLogin}
						changeForm={() => setShowLogin(true)}
						loading={props.loading}
						authStart={props.authStart}
					/>
				)}
			</div>
		</div>
	);
}

const mapStateToProps = ({ auth }) => ({
	loading: auth.loading || false,
	isAuthenticatedEmployee: auth.token !== null,
});

const mapDispatchToProps = {
	authStart: auth.authStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
