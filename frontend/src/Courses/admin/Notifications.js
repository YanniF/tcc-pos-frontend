import React from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography, Divider, CircularProgress } from '@material-ui/core';
import Assignment from '@material-ui/icons/Assignment';
import Star from '@material-ui/icons/Star';

import coursesStyles from '../coursesStyles';

const styles = (theme) => ({
	...theme.properties,
	paper: {
		...coursesStyles.paper,
		marginTop: '2rem',
	},
	title: {
		marginBottom: '.8rem',
	},
	notification: {
		display: 'flex',
		alignItems: 'center',
	},
	text: {
		marginLeft: '.8rem',
	},
	divider: {
		margin: '.5rem 0',
	},
	loaderWrapper: {
		...coursesStyles.loaderWrapper,
		height: 'initial',
		marginTop: '15px',
	},
});

function Notifications(props) {
	const { classes, isRequestingNotifications, notifications } = props;

	const textNot = {
		newStudent: ' se matriculou no curso ',
		finishedCourse: ' concluiu o curso ',
		newRating: ' avaliou o curso ',
	};

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" component="h3" className={classes.title}>
				Notificações
			</Typography>
			{/* TODO: link para ver as notificacoes */}
			{isRequestingNotifications ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={100} color="primary" />
				</div>
			) : (
				notifications.map((not, index) => (
					<React.Fragment key={not.id}>
						<div className={classes.notification}>
							{not.type === 'newStudent' || not.type === 'finishedCourse' ? <Assignment /> : <Star />}
							<span className={classes.text}>{not.studentName + textNot[not.type] + not.courseTitle}</span>
						</div>
						{index !== notifications.length - 1 && <Divider className={classes.divider} />}
					</React.Fragment>
				))
			)}
		</Paper>
	);
}

const mapStateToProps = ({ auth }) => ({
	isRequestingNotifications: auth.isRequestingNotifications,
	notifications: auth.notifications || [],
});

export default connect(mapStateToProps)(withStyles(styles)(Notifications));
