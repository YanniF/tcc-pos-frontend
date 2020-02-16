import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

function Button(props) {
	let buttonClasses = [ classes.button, classes.default ];

	if (props.type === 'highlight') {
		buttonClasses = [ classes.button, classes.highlight ];
	}

	return (
		<button className={buttonClasses.join(' ')} onClick={props.onClick} style={{ ...props.styles }}>
			{props.title}
		</button>
	);
}

Button.propTypes = {
	title: PropTypes.string,
	type: PropTypes.oneOf([ 'default', 'highlight' ]),
	onClick: PropTypes.func,
	styles: PropTypes.object,
};

export default Button;
