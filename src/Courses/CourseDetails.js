import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import Image from '../shared/components/SVG/PressPlay';

const styles = (theme) => ({
	...theme.properties,
	paper: {
		padding: '2rem',
	},
	btnLarge: {
		marginTop: '1rem',
		padding: '.7rem',
		width: '100%',
	},
	group: {
		margin: '2rem 0',
	},
});

function CourseDetails(props) {
	const { classes } = props;

	return (
		<main className={classes.main}>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					<Paper className={classes.paper}>oi</Paper>
				</Grid>
				<Grid item sm={4}>
					<Paper className={classes.paper}>
						<Image height="200px" width="400px" />
						<Button
							color="secondary"
							variant="contained"
							className={classes.btnLarge}
							onClick={() => console.log('matricular')}
						>
							Matricular
						</Button>
						<div className={classes.group}>
							<Typography variant="body1" color="primary" component="p">
								Professor(a)
							</Typography>
							<Typography variant="h4" color="textSecondary" component="p">
								John Doe
							</Typography>
						</div>
						<div className={classes.group} style={{ marginBottom: 0 }}>
							<Typography variant="body1" color="primary" component="p">
								Avaliações
							</Typography>
							<Rating name="read-only" value={4} precision={0.5} size="large" readOnly />
						</div>
					</Paper>
				</Grid>
			</Grid>
		</main>
	);
}

export default withStyles(styles)(CourseDetails);
