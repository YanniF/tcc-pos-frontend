const primary = {
	light: '#6d6a95',
	main: '#3f3d56',
	dark: '#2c2a3c',
	contrastText: '#fff',
};

const secondary = {
	light: '#3cebae',
	main: '#16dd97',
	dark: '#11b078',
	contrastText: '#fff',
};

export default {
	palette: {
		primary,
		secondary,
		text: {
			primary: 'rgba(51, 51, 51, 1)',
			secondary: 'rgba(0, 0, 0, 0.54)',
			disabled: 'rgba(0, 0, 0, 0.38)',
			hint: 'rgba(0, 0, 0, 0.38)',
		},
	},
	/* typography: {
		htmlFontSize: 10,
	}, */
	properties: {
		container: {
			width: '80vw',
			margin: '0 auto',
		},
		main: {
			margin: '7rem 0',
		},
		btnLarge: {
			padding: '.8rem 1.8rem',
		},
		link: {
			position: 'relative',
			display: 'inline-block',
			marginBottom: '5px',
			color: primary.main,
			textDecoration: 'none',
			cursor: 'pointer',
			zIndex: 1,

			'&::after': {
				content: '""',
				position: 'absolute',
				bottom: '5px',
				left: '-1px',
				right: '-2px',
				height: '.3em',
				backgroundColor: secondary.main,
				borderRadius: '3px',
				opacity: 0,
				zIndex: -1,
				transition: 'opacity .2s',
			},
			'&:hover::after': {
				opacity: 1,
			},
		},
	},
};
