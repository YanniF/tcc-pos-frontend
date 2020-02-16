import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

function Input(props) {
	return (
		<div>
			<input
				type={props.type || 'text'}
				name={props.name}
				className={classes.input}
				placeholder={props.label}
				onChange={props.onChange}
				required={props.required}
			/>
			<label htmlFor={props.name} className={classes.label}>
				{props.label}
			</label>
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
