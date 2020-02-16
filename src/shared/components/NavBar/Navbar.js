import React from 'react';

import Logo from '../Logo/Logo';
import NavbarItem from './NavbarItem';
import classes from './Navbar.module.scss';

function Navbar() {
	return (
		<nav className={classes.navbar}>
			<Logo />
			<ul className={classes.navbarItems}>
				<NavbarItem link="/courses">Cursos</NavbarItem>
				<NavbarItem link="/perfil">Perfil</NavbarItem>
				<NavbarItem link="/logout">Sair</NavbarItem>
			</ul>
		</nav>
	);
}

export default Navbar;
