import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

function Input(props) {
	const [ showPassword, setShowPassword ] = useState(false);
	const [ inputType, setInputType ] = useState(props.type);

	const handleShowPassword = () => {
		showPassword ? setInputType('password') : setInputType('text');
		setShowPassword(!showPassword);
	};

	return (
		<div className={classes.group}>
			<input
				type={inputType}
				name={props.name}
				className={classes.input}
				placeholder={props.label}
				onChange={props.onChange}
				required={props.required}
			/>
			<label htmlFor={props.name} className={classes.label}>
				{props.label}
			</label>
			{props.type === 'password' && (
				<span className={classes.showPassword} onClick={handleShowPassword}>
					{showPassword ? 'Esconder' : 'Mostrar'}
				</span>
			)}
		</div>
	);
}

Input.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	required: PropTypes.bool,
};

export default Input;
