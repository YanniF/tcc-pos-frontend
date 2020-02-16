import React from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/components/Button/Button';
import classes from './Auth.module.scss';

function Register(props) {
	const handleRegister = () => {
		console.log('register');
	};

	return (
		<form className={classes.form}>
			<div style={{ animation: `${props.showRegister && classes.fade} .5s reverse` }}>
				<h2 className={classes.title}>Criar Conta</h2>
				<Button title="Criar Conta" onClick={handleRegister} styles={{ minWidth: '22rem' }} />
				<Button title="Acessar Sistema" type="highlight" onClick={props.changeForm} styles={{ minWidth: '22rem' }} />
			</div>
		</form>
	);
}

Register.propTypes = {
	changeForm: PropTypes.func,
};

export default Register;
