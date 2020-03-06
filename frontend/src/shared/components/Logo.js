import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import logoWhite from '../assets/logoWhite.png';

function Logo({ option = 'logo', width = '250px' }) {
	return (
		<div>
			{option === 'logo' ? (
				<img src={logo} alt="Logo" style={{ width }} />
			) : (
				<Link to="/courses">
					<img src={logoWhite} alt="Logo" style={{ width }} />
				</Link>
			)}
		</div>
	);
}

export default Logo;
