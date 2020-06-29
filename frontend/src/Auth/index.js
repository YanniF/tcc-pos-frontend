import React, { useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { auth } from '../store/actions';
import Login from './Login';
import Register from './Register';
import Image1 from '../shared/components/SVG/Remotely';
import Image2 from '../shared/components/SVG/Pair';
import Logo from '../shared/components/Logo';

let randomNumber = Math.floor(Math.random() * 2);

function Auth(props) {
	const [ showLogin, setShowLogin ] = useState(true);

	const handleChangeForm = (value) => {
		setShowLogin(value);
		props.clearAuthErrors();
	};

	return (
		<div>
			<Logo />
			<Grid container spacing={8}>
				<Hidden only={['xs', 'sm', 'md']}>
					<Grid item xl={7} lg={6}>
						{randomNumber % 2 === 0 ? <Image1 width="100%" /> : <Image2 width="100%" />}
					</Grid>
				</Hidden>
				<Grid item xl={5} lg={6} md={12} style={{ display: 'flex', alignItems: 'center' }}>
					{showLogin ? (
						<Login
							showLogin={showLogin}
							changeForm={() => handleChangeForm(false)}
							loading={props.loading}
							login={props.login}
							errors={props.errors}
						/>
					) : (
						<Register
							showRegister={!showLogin}
							changeForm={() => handleChangeForm(true)}
							loading={props.loading}
							signupUser={props.signupUser}
							errors={props.errors}
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
	errors: auth.errors || {},
});

const mapDispatchToProps = {
	login: auth.login,
	signupUser: auth.signupUser,
	clearAuthErrors: auth.clearAuthErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
