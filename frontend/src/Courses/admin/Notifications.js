import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, Typography, Divider } from '@material-ui/core';
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
});

function Notifications(props) {
	const { classes } = props;

	const notifications = [
		{ id: 1, name: 'Rob Smith', course: 'Front end master ninja', type: 'finished' },
		{ id: 2, name: 'Jackie Chan', course: 'Back end master ninja', type: 'rated' },
		{ id: 3, name: 'Max Mustermann', course: 'Back end master ninja', type: 'rated' },
		{ id: 4, name: 'Frau Francis', course: 'Front end master ninja', type: 'finished' },
	];

	const textNot = { finished: ' concluiu o curso ', rated: ' avaliou o curso ' };

	return (
		<Paper className={classes.paper}>
			<Typography variant="h5" component="h3" className={classes.title}>
				Notificações
			</Typography>
			{/* TODO: link para ver as notificacoes */}
			{notifications.map((not, index) => (
				<React.Fragment key={not.id}>
					<div className={classes.notification}>
						{not.type === 'finished' ? <Assignment /> : <Star />}
						<span className={classes.text}>{not.name + textNot[not.type] + not.course}</span>
					</div>
					{index !== notifications.length - 1 && <Divider className={classes.divider} />}
				</React.Fragment>
			))}
		</Paper>
	);
}

export default withStyles(styles)(Notifications);
