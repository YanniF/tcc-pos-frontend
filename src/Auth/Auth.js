import React, { useState } from 'react';

import Login from './Login';
import Register from './Register';
import Image from '../shared/components/SVG/illustrations/Remotely';
import Logo from '../shared/components/Logo/Logo';
import classes from './Auth.module.scss';

function Auth() {
	const [ showLogin, setShowLogin ] = useState(true);

	return (
		<div className={classes.auth}>
			<nav>
				<Logo />
			</nav>
			<div className={classes.forms}>
				<Image width="75rem" height="75rem" />
				{showLogin ? (
					<Login showLogin={showLogin} changeForm={() => setShowLogin(false)} />
				) : (
					<Register showRegister={!showLogin} changeForm={() => setShowLogin(true)} />
				)}
			</div>
		</div>
	);
}

export default Auth;
