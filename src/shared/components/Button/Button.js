import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../Loader/Loader';
import classes from './Button.module.scss';

function Button(props) {
	let buttonClasses = [ classes.button, classes.default ];

	if (props.type === 'highlight') {
		buttonClasses = [ classes.button, classes.highlight ];
	}

	return (
		<button
			className={buttonClasses.join(' ')}
			onClick={props.onClick}
			style={{ ...props.styles }}
			disabled={props.disabled}
		>
			{props.loading ? <Loader height="17" /> : props.title}
		</button>
	);
}

Button.propTypes = {
	title: PropTypes.string,
	type: PropTypes.oneOf([ 'default', 'highlight' ]),
	onClick: PropTypes.func,
	styles: PropTypes.object,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
};

export default Button;
