import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography, CircularProgress } from '@material-ui/core';

import SearchInput from '../../shared/components/SearchInput';
import SnackBar from '../../shared/components/SnackBar';
import CourseCard from '../components/CourseCard';
import coursesStyles from '../coursesStyles';
import Notifications from './Notifications';
import CourseModal from './CourseModal';
import DeleteModal from './DeleteModal';
import NoData from '../../shared/components/SVG/NoData';

import { courses } from '../../store/actions';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	btnLarge: {
		marginTop: '2rem',
		padding: '.7rem',
		width: '100%',
	},
	spacingTop: {
		marginTop: '2rem',
	},
});

function Courses(props) {
	const [ searchTerm, setSearchTerm ] = useState('');
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
		clearCourseErrors,
	} = props;

	useEffect(
		() => {
			getAllCourses();
		},
		[ getAllCourses ],
	);

	const handleSetVisibility = (open) => {
		clearCourseErrors();
		setModalVisibility(open);
	};

	const handleModalDeleteVisibility = (open, id) => {
		setModalDeleteVisibility(open, id);
	};

	const handleAddCourse = (course) => {
		const { history, addCourse } = props;
		addCourse(course, history);
	};

	const handleSearchCourse = (search = '') => {
		setSearchTerm(search);
	};

	const { classes, loading, getCourse, errors, message, setToasterMessage } = props;
	const filteredCourses = courses.filter((course) => course.title.toLowerCase().includes(searchTerm));

	return (
		<main className={classes.main}>
			<Typography variant="h4" component="h3" gutterBottom>
				Meus Cursos
			</Typography>
			{isRequestingCourses ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<Fragment>
					<Grid container spacing={10}>
						<Grid item sm={8}>
							<Grid container spacing={10}>
								{filteredCourses.length ? (
									filteredCourses.map((course) => (
										<Grid item sm={6} key={course.id}>
											<CourseCard
												course={course}
												isAdmin
												setSelectedCourse={getCourse}
												setModalDeleteVisibility={handleModalDeleteVisibility}
											/>
										</Grid>
									))
								) : (
									<Fragment>
										<Grid item sm={1} className={classes.spacingTop}>
											<NoData width="82px" height="78px" />
										</Grid>
										<Grid item sm={11} className={classes.spacingTop}>
											<Typography variant="h6" component="h5">
												Nenhum curso encontrado.
											</Typography>
											{courses.length > 0 && !searchTerm ? (
												<Typography variant="body1" component="p">
													Clique no botão "Adicionar Curso" para cadastrar um novo curso.
												</Typography>
											) : (
												<Typography variant="body1" component="p">
													Tente pesquisar por outro curso.
												</Typography>
											)}
										</Grid>
									</Fragment>
								)}
							</Grid>
						</Grid>
						<Grid item sm={4}>
							<Paper className={classes.paper}>
								<SearchInput fullWidth onChange={handleSearchCourse} />
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
					{open && (
						<CourseModal
							open={open}
							setVisibility={handleSetVisibility}
							addCourse={handleAddCourse}
							loading={loading}
							errors={errors}
						/>
					)}
					{deleteModalOpen && (
						<DeleteModal
							open={deleteModalOpen}
							setVisibility={setModalDeleteVisibility}
							course={selectedCourse}
							deleteCourse={() => deleteCourse(selectedCourse.id)}
							loading={loading}
							errors={errors}
						/>
					)}
				</Fragment>
			)}
			<SnackBar message={message} setToasterMessage={setToasterMessage} />
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
	errors: courses.errors || {},
	message: courses.message,
});

const mapDispatchToProps = {
	setModalVisibility: courses.setModalVisibility,
	setModalDeleteVisibility: courses.setModalDeleteVisibility,
	getAllCourses: courses.getAllCourses,
	getCourse: courses.getCourse,
	addCourse: courses.addCourse,
	deleteCourse: courses.deleteCourse,
	setToasterMessage: courses.setToasterMessage,
	clearCourseErrors: courses.clearCourseErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Courses));
