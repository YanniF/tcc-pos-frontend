import React from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/components/Button/Button';
import Input from '../shared/components/Input/Input';
import classes from './Auth.module.scss';

function Login(props) {
	const handleLogin = () => {
		console.log('login');
	};

	return (
		<form className={classes.form}>
			<div style={{ animation: `${props.showLogin && classes.fade} .5s reverse` }}>
				<h2 className={classes.title}>Bem-vindo(a)</h2>
				<div style={{ marginBottom: '30px' }}>
					<Input type="email" name="email" label="E-mail" required />
					<Input type="password" name="senha" label="Senha" required />
				</div>
				<div>
					<Button title="Acessar Sistema" onClick={handleLogin} styles={{ minWidth: '22rem' }} />
					<Button title="Criar Conta" type="highlight" onClick={props.changeForm} styles={{ minWidth: '22rem' }} />
				</div>
			</div>
		</form>
	);
}

Login.propTypes = {
	showLogin: PropTypes.bool,
	changeForm: PropTypes.func,
};

export default Login;
