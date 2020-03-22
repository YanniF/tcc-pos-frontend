import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography, CircularProgress } from '@material-ui/core';

import SearchInput from '../../shared/components/SearchInput';
import CourseCard from '../components/CourseCard';
import coursesStyles from '../coursesStyles';
import Notifications from './Notifications';
import CourseModal from './CourseModal';
import DeleteModal from './DeleteModal';

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
	const {
		open,
		setModalVisibility,
		setModalDeleteVisibility,
		courses,
		getAllCourses,
		isRequestingCourses,
		deleteCourse,
		selectedCourse,
		deleteModalOpen,
	} = props;

	useEffect(
		() => {
			getAllCourses();
		},
		[ getAllCourses ],
	);

	const handleSetVisibility = (open) => {
		setModalVisibility(open);
	};

	const handleModalDeleteVisibility = (open, id) => {
		setModalDeleteVisibility(open, id);
	};

	const handleAddCourse = (course) => {
		const { history, addCourse } = props;
		addCourse(course, history);
	};

	const { classes, loading, getCourse } = props;

	return (
		<main className={classes.main}>
			{/* TODO: mensagem para quando não tiver nenhum curso */}
			<Typography variant="h4" component="h3" gutterBottom>
				Meus Cursos
			</Typography>
			{isRequestingCourses ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<React.Fragment>
					<Grid container spacing={10}>
						<Grid item sm={8}>
							<Grid container spacing={10}>
								{courses.map((course) => (
									<Grid item sm={6} key={course.id}>
										<CourseCard
											course={course}
											isAdmin
											setSelectedCourse={getCourse}
											setModalDeleteVisibility={handleModalDeleteVisibility}
										/>
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
					<DeleteModal
						open={deleteModalOpen}
						setVisibility={setModalDeleteVisibility}
						course={selectedCourse}
						deleteCourse={() => deleteCourse(selectedCourse.id)}
						loading={loading}
					/>
				</React.Fragment>
			)}
		</main>
	);
}

const mapStateToProps = ({ courses }) => ({
	loading: courses.loading || false,
	isRequestingCourses: courses.isRequestingCourses || false,
	courses: courses.courses || [],
	selectedCourse: courses.selectedCourse || {},
	open: courses.courseModalOpen || false,
	deleteModalOpen: courses.deleteModalOpen || false,
});

const mapDispatchToProps = {
	setModalVisibility: courses.setModalVisibility,
	setModalDeleteVisibility: courses.setModalDeleteVisibility,
	getAllCourses: courses.getAllCourses,
	getCourse: courses.getCourse,
	addCourse: courses.addCourse,
	deleteCourse: courses.deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Courses));
