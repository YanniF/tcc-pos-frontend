import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { auth } from '../store/actions';
import Login from './Login';
import Register from './Register';
import Image1 from '../shared/components/SVG/Remotely';
import Image2 from '../shared/components/SVG/Pair';
import Logo from '../shared/components/Logo/Logo';

function Auth(props) {
	const [ showLogin, setShowLogin ] = useState(true);
	let randomNumber;

	useEffect(() => {
		randomNumber = Math.floor(Math.random() * 2);
	});

	if (props.isAuthenticatedEmployee) {
		return <Redirect to="/courses" />;
	}

	return (
		<div>
			<Logo />
			<Grid container spacing={1}>
				<Grid item sm={7}>
					{randomNumber % 2 === 0 ? <Image1 width="50rem" /> : <Image2 width="50rem" />}
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
