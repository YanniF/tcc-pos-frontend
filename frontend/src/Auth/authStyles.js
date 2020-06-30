import theme from '../shared/util/theme'

export default {	
	paperForm: {
		padding: '3rem',
	},
	btnLarge: {
		...theme.properties.btnLarge,
		width: '100%',
		fontSize: 'inherit',

		'@media screen and (max-width: 1540px)': {
			padding: '.6rem 1.6rem',
			fontSize: '14px'
		}
	},
	buttons: {
		display: 'flex',
		marginTop: '2.8rem',
		'& button:not(:last-child)': {
			marginRight: '3rem',
		},

		'@media screen and (max-width: 1500px)': {
			marginTop: '1.8rem',
		},

		'@media screen and (max-width: 600px)': {
			flexDirection: 'column',

			'& button:not(:last-child)': {
				marginBottom: '1rem',
				marginRight: '0',
			},
		}
	},	
};
