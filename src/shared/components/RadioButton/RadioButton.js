import React from 'react';
import PropTypes from 'prop-types';

import classes from './RadioButton.module.scss';

function RadioButton(props) {
	return (
		<label className={classes.label}>
			{props.label}
			<input
				type="radio"
				className={classes.radio}
				checked={props.checked}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
			/>
			<span className={classes.checkmark} />
		</label>
	);
}

RadioButton.protoTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};

export default RadioButton;
