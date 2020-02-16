import React from 'react';
import PropTypes from 'prop-types';

import classes from './Checkbox.module.scss';

function Checkbox(props) {
	return (
		<label className={classes.label}>
			{props.label}
			<input
				type="checkbox"
				name={props.name}
				className={classes.checkbox}
				checked={props.checked}
				onChange={props.onChange}
			/>
			<span className={classes.checkmark} />
		</label>
	);
}

Checkbox.protoTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Checkbox;
