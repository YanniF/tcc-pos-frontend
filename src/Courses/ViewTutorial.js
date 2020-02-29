import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid } from '@material-ui/core';

import Sidebar from './components/Sidebar';

const styles = (theme) => ({
	...theme.properties,
});

// mostrar titulo do curso
// importar side bar
// importar player
// titulo do video
function ViewTutorial(props) {
	const { classes } = props;

	return (
		<main className={classes.main}>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					s
				</Grid>
				<Grid item sm={4}>
					<Sidebar />
				</Grid>
			</Grid>
		</main>
	);
}

export default withStyles(styles)(ViewTutorial);
