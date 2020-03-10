import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { auth } from '../store/actions';
import Login from './Login';
import Register from './Register';
import Image1 from '../shared/components/SVG/Remotely';
import Image2 from '../shared/components/SVG/Pair';
import Logo from '../shared/components/Logo';

let randomNumber = Math.floor(Math.random() * 2);

function Auth(props) {
	const [ showLogin, setShowLogin ] = useState(true);

/* 	if (props.isAuthenticatedEmployee) {
		return <Redirect to="/courses" />;
	}
*/
	/* if (props.isAuthenticatedAdmin) {
		console.log(props.isAuthenticatedAdmin)
		return <Redirect to="/admin/courses" />;
	}  */

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
							login={props.login}
						/>
					) : (
						<Register
							showRegister={!showLogin}
							changeForm={() => setShowLogin(true)}
							loading={props.loading}
							signupUser={props.signupUser}
						/>
					)}
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = ({ auth }) => ({
	loading: auth.loading || false,
	isAuthenticatedEmployee: auth.user && !auth.user.admin,
	isAuthenticatedAdmin: auth.user && auth.user.admin,
});

const mapDispatchToProps = {
	login: auth.login,
	signupUser: auth.signupUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
