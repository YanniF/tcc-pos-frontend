import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

function Input(props) {
	return <input className={classes.input} onChange={props.onChange} />;
}

Input.propTypes = {
	value: PropTypes.string,
};

export default Input;
