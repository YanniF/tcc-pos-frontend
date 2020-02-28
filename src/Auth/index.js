import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { auth } from '../store/actions';
import Login from './Login';
import Register from './Register';
import Image from '../shared/components/SVG/illustrations/Remotely';
import Logo from '../shared/components/Logo/Logo';

function Auth(props) {
	const [ showLogin, setShowLogin ] = useState(true);

	if (props.isAuthenticatedEmployee) {
		return <Redirect to="/courses" />;
	}

	return (
		<div>
			<Logo />
			<Grid container spacing={1}>
				<Grid item sm={7}>
					<Image width="50rem" />
				</Grid>
				<Grid item sm={5} style={{ display: 'flex', alignItems: 'center' }}>
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
				</Grid>
			</Grid>
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
