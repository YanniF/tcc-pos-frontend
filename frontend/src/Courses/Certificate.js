import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

import { Button } from '@material-ui/core';
import PrintIcon from '@material-ui/icons/Print';
import { coursesUser } from '../store/actions';
import image from '../shared/assets/cert.jpg';

const styles = (theme) => ({
	...theme.properties,
	btnPrint: {
		position: 'absolute',
		marginTop: '-40px',
		zIndex: '1',

		'@media print': {
			display: 'none',
		},
	},
	printIcon: {
		marginRight: '8px',
	},
	certificate: {
		position: 'fixed',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minWidth: '100vw',
		top: 0,
		right: 0,
		bottom: 0,
		left: '50%',
		transform: 'translateX(-50%)',
		backgroundImage: `url(${image})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'center',
		zIndex: -1,
	},
	text: {
		width: '40%',
		marginTop: '2.3em',
		marginBottom: 0,
		fontSize: '2.5em',
		textAlign: 'center',
		lineHeight: '2',
		color: '#333',

		'@media print': {
			width: '60%',
			lineHeight: '1.6',
		},
	},
});

function Certificate({ classes, selectedCourse, user, setHideNavbar }) {
	useEffect(
		() => {
			setHideNavbar(true);
		},
		[ setHideNavbar ],
	);

	return (
		<div>
			<Button color="primary" variant="contained" onClick={() => window.print()} className={classes.btnPrint}>
				<PrintIcon className={classes.printIcon} /> Imprimir
			</Button>
			<div className={classes.certificate}>
				<p className={classes.text}>
					Certificamos que <strong>{user.name}</strong> concluiu o curso <strong>{selectedCourse.title}</strong>{' '}
					ministrado pelo(a) professor(a) <strong>{selectedCourse.teacher}</strong>
				</p>
			</div>
		</div>
	);
}

const mapStateToProps = ({ coursesUser, auth }) => ({
	user: auth.user || {},
	selectedCourse: coursesUser.selectedCourse || {},
});

export default connect(mapStateToProps, { ...coursesUser })(withStyles(styles)(Certificate));
