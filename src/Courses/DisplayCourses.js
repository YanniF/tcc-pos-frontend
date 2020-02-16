import React from 'react';
import PropTypes from 'prop-types';

function DisplayCourses(props) {
	return (
		<div>
			<h2>{props.title}</h2>
			<div>all DisplayCourses</div>
		</div>
	);
}

DisplayCourses.propTypes = {
	title: PropTypes.string,
};

export default DisplayCourses;
