import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/components/Button/Button';
import Input from '../shared/components/Input/Input';
import RadioButton from '../shared/components/RadioButton/RadioButton';
import classes from './Auth.module.scss';

function Register(props) {
	const [ userType, setUserType ] = useState('aluno');

	const handleRegister = () => {
		props.authStart();
	};

	return (
		<form className={classes.form}>
			<div className={props.showRegister && classes.fade}>
				<h2 className={classes.title}>Criar Conta</h2>
				<div>
					<Input type="text" name="firstname" label="Nome" required />
					<Input type="text" name="lastname" label="Sobrenome" required />
					<Input type="email" name="email" label="E-mail" required />
					<Input type="password" name="password" label="Senha" required />
					<span style={{ display: 'block' }}>Você é:</span>
					<div className={classes.radioButtons}>
						<RadioButton
							name="userType"
							value="aluno"
							label="Aluno"
							checked={userType === 'aluno'}
							onChange={() => setUserType('aluno')}
						/>
						<RadioButton
							name="userType"
							value="supervisor"
							label="Supervisor"
							checked={userType === 'supervisor'}
							onChange={() => setUserType('supervisor')}
						/>
					</div>
					{userType === 'supervisor' && <Input type="text" name="code" label="Código" required />}
				</div>
				<div className={classes.buttons}>
					<Button title="Criar Conta" onClick={handleRegister} styles={{ minWidth: '22rem' }} loading={props.loading} />
					<Button
						title="Fazer Login"
						type="highlight"
						onClick={props.changeForm}
						styles={{ minWidth: '22rem' }}
						disabled={props.loading}
					/>
				</div>
			</div>
		</form>
	);
}

Register.propTypes = {
	showRegister: PropTypes.bool,
	changeForm: PropTypes.func,
	loading: PropTypes.bool,
	authStart: PropTypes.func,
};

export default Register;
