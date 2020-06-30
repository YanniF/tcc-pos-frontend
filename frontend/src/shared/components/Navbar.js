import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import Logo from './Logo';
import { logout } from '../../store/actions/auth';

const styles = (theme) => ({
	...theme.properties,
	toolbar: {
		justifyContent: 'space-between',
		padding: 0,

		'@media screen and (max-width: 650px)': {
			flexDirection: 'column',
		}
	},
	activeLink: {
		color: theme.palette.secondary.main,
	},
});

// TODO: link para o relatorio
function Navbar(props) {
	const { classes, logout, isAdmin, hideNavbar } = props;
	return (
		<AppBar style={{ display: hideNavbar ? 'none' : 'flex' }}>
			<div className={classes.container}>
				<Toolbar className={classes.toolbar}>
					<Logo option="logoWhite" width="250px" />
					<div>
						{isAdmin ? (
							<Button color="inherit" component={NavLink} to="/admin/courses" activeClassName={classes.activeLink}>
								Cursos
							</Button>
						) : (
							<React.Fragment>
								<Button color="inherit" exact component={NavLink} to="/" activeClassName={classes.activeLink}>
									Home
								</Button>
								<Button color="inherit" exact component={NavLink} to="/courses" activeClassName={classes.activeLink}>
									Meus Cursos
								</Button>
							</React.Fragment>
						)}
						<Button color="inherit" onClick={logout}>
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
	logout: PropTypes.func,
};

const mapStateToProps = ({ coursesUser }) => ({
	hideNavbar: coursesUser.hideNavbar
});



export default connect(mapStateToProps, { logout })(withStyles(styles)(Navbar));
