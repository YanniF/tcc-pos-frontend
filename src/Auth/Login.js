import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/components/Button/Button';
import Input from '../shared/components/Input/Input';
import Checkbox from '../shared/components/Checkbox/Checkbox';
import classes from './Auth.module.scss';

function Login(props) {
	const [ rememberMe, setRememberMe ] = useState(true);

	const handleLogin = () => {
		console.log('login');
	};

	return (
		<form className={classes.form}>
			<div className={props.showLogin && classes.fade}>
				<h2 className={classes.title}>Bem-vindo(a)</h2>
				<div>
					<Input type="email" name="email" label="E-mail" required />
					<Input type="password" name="password" label="Senha" required />
					<Checkbox
						name="lembrar"
						label="Manter logado"
						checked={rememberMe}
						onChange={() => setRememberMe(!rememberMe)}
					/>
				</div>
				<div className={classes.buttons}>
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
