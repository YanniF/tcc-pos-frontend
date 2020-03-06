import theme from '../shared/util/theme'

export default {	
	paperForm: {
		padding: '3rem',
	},
	btnLarge: {
		...theme.properties.btnLarge,
		width: '100%',
		fontSize: 'inherit'
	},
	buttons: {
		display: 'flex',
		marginTop: '3rem',
		'& button:not(:last-child)': {
			marginRight: '3rem',
		},
	},	
};
