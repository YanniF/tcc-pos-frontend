import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';

import SearchInput from '../../shared/components/SearchInput';
import CourseCard from '../components/CourseCard';
import coursesStyles from '../coursesStyles';
import Notifications from './Notifications';
import CourseModal from './CourseModal';

import { courses } from '../../store/actions';

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
	const { open, setModalVisibility, courses, getAllCourses } = props;

	useEffect(
		() => {
			getAllCourses();
		},
		[ getAllCourses ],
	);

	const handleSetVisibility = (open) => {
		setModalVisibility(open);
	};

	const handleAddCourse = (course) => {
		const { history, addCourse } = props;
		addCourse(course, history);
	};

	const { classes, loading } = props;

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
			<CourseModal open={open} setVisibility={handleSetVisibility} addCourse={handleAddCourse} loading={loading} />
		</main>
	);
}

const mapStateToProps = ({ courses }) => ({
	loading: courses.loading || false,
	open: courses.courseModalOpen,
	courses: courses.courses || [],
});

const mapDispatchToProps = {
	setModalVisibility: courses.setModalVisibility,
	addCourse: courses.addCourse,
	getAllCourses: courses.getAllCourses,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Courses));
