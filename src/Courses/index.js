import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CourseCard from './CourseCard';

import image1 from '../shared/assets/thumb1.jpg';
import image2 from '../shared/assets/thumb2.jpg';

const styles = (theme) => ({
	...theme.properties,
	main: {
		margin: '7rem 0',
	},
	grid: {
		marginBottom: '3rem',
	},
	title: {
		marginBottom: '3rem',
		fontWeight: '300',
		color: theme.palette.primary.main,

		'& span': {
			color: theme.palette.secondary.main,
		},
	},
	subtitle: {
		fontWeight: '300',
	},
});
function Courses(props) {
	const ongoing = [
		{
			id: 1,
			title: 'Titulo do Curso',
			teacher: 'John Doe',
			image: image1,
			rating: { rating: 5, numberOfRatings: 10 },
		},
		{
			id: 2,
			title: 'Titulo do Curso',
			teacher: 'John Doe',
			image: image2,
			rating: { rating: 3.5, numberOfRatings: 8 },
		},
		{
			id: 3,
			title: 'Curso',
			teacher: 'John Doe',
			image: image1,
			rating: { rating: 4, numberOfRatings: 90 },
		},
	];

	const finished = [
		{
			id: 4,
			title: 'Curso',
			teacher: 'John Doe',
			image: image2,
			rating: { rating: 4, numberOfRatings: 17 },
		},
		{
			id: 5,
			title: 'Titulo do Curso',
			teacher: 'John Doe',
			image: image1,
			rating: { rating: 5, numberOfRatings: 10 },
		},
		{
			id: 6,
			title: 'Curso',
			teacher: 'John Doe',
			image: image2,
			rating: { rating: 4, numberOfRatings: 7 },
		},
	];

	const { classes } = props;

	return (
		<main className={classes.main}>
			<Typography variant="h3" component="h2" gutterBottom className={classes.title}>
				<span>Meus</span> Cursos
			</Typography>
			<div>
				<Typography variant="h4" component="h3" gutterBottom className={classes.subtitle}>
					Em Andamento
				</Typography>
				<Grid container spacing={10} className={classes.grid}>
					{ongoing.map((course) => (
						<Grid item sm={4} key={course.id}>
							<CourseCard course={course} isFinished={false} />
						</Grid>
					))}
				</Grid>
			</div>
			<div>
				<Typography variant="h4" component="h3" gutterBottom className={classes.subtitle}>
					Concluídos
				</Typography>
				<Grid container spacing={10} className={classes.grid}>
					{finished.map((course) => (
						<Grid item sm={4} key={course.id}>
							<CourseCard course={course} isFinished />
						</Grid>
					))}
				</Grid>
			</div>
		</main>
	);
}

export default withStyles(styles)(Courses);
