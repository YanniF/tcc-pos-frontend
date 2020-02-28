import React from 'react';

import logo from '../../assets/logo.png'
import logoWhite from '../../assets/logoWhite.png'

function Logo({ option = 'logo', width = '250px' }) {	
	return (
		<div>
			{option === 'logo' ? (
				<img src={logo} alt='Logo' style={{ width }} />
			) : (
				<img src={logoWhite} alt='Logo' style={{ width }} />
			)}
		</div>
	);
}

export default Logo;
