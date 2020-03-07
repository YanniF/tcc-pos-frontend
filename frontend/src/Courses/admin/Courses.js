import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';

import SearchInput from '../../shared/components/SearchInput';
import CourseCard from '../components/CourseCard';
import coursesStyles from '../coursesStyles';
import image1 from '../../shared/assets/thumb1.jpg';
import image2 from '../../shared/assets/thumb2.jpg';
import Notifications from './Notifications';
import CourseModal from './CourseModal';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	btnLarge: {
		marginTop: '2rem',
		padding: '.7rem',
		width: '100%',
	},
});

function Courses(props) {
	const [ open, setOpen ] = useState(false);

	const courses = [
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
		{
			id: 4,
			title: 'Curso',
			teacher: 'John Doe',
			image: image1,
			rating: { rating: 4, numberOfRatings: 90 },
		},
	];

	const handleSetVisibility = (open) => {
		setOpen(open);
	};

	const handleAddCourse = () => {
		const id = 1;
		props.history.push(`/admin/courses/${id}/details/`);
	};

	const { classes } = props;

	return (
		<main className={classes.main}>
			{/* TODO: mensagem para quando não tiver nenhum curso */}
			<Typography variant="h4" component="h3" gutterBottom>
				Meus Cursos
			</Typography>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					<Grid container spacing={10}>
						{courses.map((course) => (
							<Grid item sm={6} key={course.id}>
								<CourseCard course={course} isAdmin />
							</Grid>
						))}
					</Grid>
				</Grid>
				<Grid item sm={4}>
					<Paper className={classes.paper}>
						<SearchInput fullWidth onClick={() => console.log('click')} />
						<Button
							color="secondary"
							variant="contained"
							className={classes.btnLarge}
							onClick={() => handleSetVisibility(true)}
						>
							Adicionar Curso
						</Button>
					</Paper>
					<Notifications />
				</Grid>
			</Grid>
			<CourseModal open={open} setVisibility={handleSetVisibility} addCourse={handleAddCourse} />
		</main>
	);
}

export default withStyles(styles)(Courses);
