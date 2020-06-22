import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, CircularProgress } from '@material-ui/core/';

import CourseCard from './components/CourseCard';
import SearchInput from '../shared/components/SearchInput';
import coursesStyles from './coursesStyles';
import NoData from '../shared/components/SVG/NoData';
import { coursesUser } from '../store/actions';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	grid: {
		marginBottom: '3rem',
	},
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '3rem',
	},
	title: {
		margin: 0,
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

function Home(props) {
	const [ searchTerm, setSearchTerm ] = useState('');

	const { classes, getNewCourses, courses = [], isRequestingNewCourses, isRequestingEnrolledCourses, setSelectedCourse } = props;

	useEffect(
		() => {
			getNewCourses();
		},
		[ getNewCourses ],
	);

	const handleSearchCourse = (search = '') => {
		setSearchTerm(search);
	};

	const filteredCourses = courses.filter(
		(course) => course.title.toLowerCase().includes(searchTerm) || course.category.toLowerCase().includes(searchTerm),
	);

	return (
		<main className={classes.main}>
			{isRequestingNewCourses || isRequestingEnrolledCourses ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<Fragment>
					<div className={classes.wrapper}>
						<Typography variant="h3" component="h2" gutterBottom className={classes.title}>
							Novos <span>Cursos</span>
						</Typography>
						<SearchInput onChange={handleSearchCourse} />
					</div>
					<div>
						<Grid container spacing={10} className={classes.grid}>
							{filteredCourses.length ? (
								filteredCourses.map((course) => (
									<Grid item sm={4} key={course.id}>
										<CourseCard course={course} setSelectedCourse={setSelectedCourse} />
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
										<Typography variant="body1" component="p">
											Tente pesquisar por outro curso.
										</Typography>
									</Grid>
								</Fragment>
							)}
						</Grid>
					</div>
				</Fragment>
			)}
		</main>
	);
}

const mapStateToProps = ({ coursesUser }) => ({
	isRequestingNewCourses: coursesUser.isRequestingNewCourses,
	isRequestingEnrolledCourses: coursesUser.isRequestingEnrolledCourses,
	courses: coursesUser.courses || [],
});

const mapDispatchToProps = {
	getNewCourses: coursesUser.getNewCourses,
	setSelectedCourse: coursesUser.setSelectedCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));
