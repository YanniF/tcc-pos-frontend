import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography } from '@material-ui/core';

import Sidebar from './components/Sidebar';
import Player from './components/Player';
// import Test from './components/CourseTest';

const styles = (theme) => ({
	...theme.properties,
	title: {
		marginBottom: '2rem',
		fontWeight: '300',
		color: theme.palette.primary.main,
	},
});

function ViewTutorial(props) {
	const { classes } = props;

	return (
		<main className={classes.main}>
			<Typography variant="h4" component="h2" gutterBottom className={classes.title}>
				Titulo longo longo longo longo longo longo do Curso
			</Typography>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					<Player />
					{/* <Test /> */}
				</Grid>
				<Grid item sm={4}>
					<Sidebar />
				</Grid>
			</Grid>
		</main>
	);
}

export default withStyles(styles)(ViewTutorial);
