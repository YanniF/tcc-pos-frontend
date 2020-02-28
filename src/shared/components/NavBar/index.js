import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import Logo from '../Logo/Logo';

const styles = (theme) => ({
	...theme.properties,
	toolbar: {
		justifyContent: 'space-between',
		padding: 0,
	},
	activeLink: {
		color: theme.palette.secondary.main,
	},
});

function Navbar(props) {
	const { classes } = props;
	return (
		<AppBar>
			<div className={classes.container}>
				<Toolbar className={classes.toolbar}>
					<Logo option='logoWhite' width='250px' />
					<div>
						<Button color="inherit" component={NavLink} to="/courses" activeClassName={classes.activeLink}>
							Cursos
						</Button>
						<Button color="inherit" component={NavLink} to="/profile" activeClassName={classes.activeLink}>
							Perfil
						</Button>
						<Button color="inherit" component={NavLink} to="/logout" activeClassName={classes.activeLink}>
							Sair
						</Button>
					</div>
				</Toolbar>
			</div>
		</AppBar>
	);
}

Navbar.propTypes = {
	classes: PropTypes.object,
};

export default withStyles(styles)(Navbar);
