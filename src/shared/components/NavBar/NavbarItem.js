import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.scss';

function NavbarItem(props) {
	return (
		<li className={classes.navItem}>
			<NavLink to={props.link} activeClassName={classes.active}>
				{props.children}
			</NavLink>
		</li>
	);
}

NavbarItem.propTypes = {
	link: PropTypes.string,
};

export default NavbarItem;
