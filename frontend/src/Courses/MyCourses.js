import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography } from '@material-ui/core/';

import CourseCard from './components/CourseCard';
import SearchInput from '../shared/components/SearchInput';
import { coursesUser } from '../store/actions';

const styles = (theme) => ({
	...theme.properties,
	grid: {
		marginBottom: '3rem',
		height: '100%',
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

function MyCourses(props) {
	const [ searchTerm, setSearchTerm ] = useState('');

	const { classes, myCourses, getAllEnrolledCourses, setSelectedCourse } = props;

	useEffect(
		() => {
			if (myCourses.length === 0) {
				getAllEnrolledCourses();
			}
		},
		[ myCourses, getAllEnrolledCourses ],
	);

	const handleSearchCourse = (search = '') => {
		setSearchTerm(search);
	};

	const filteredCourses = myCourses.filter((course) => course && course.title.toLowerCase().includes(searchTerm));

	const ongoing = filteredCourses.filter((course) => !course.hasFinishedCourse);
	const finished = filteredCourses.filter((course) => course.hasFinishedCourse);

	return (
		<main className={classes.main}>
			<div className={classes.wrapper}>
				<Typography variant="h3" component="h2" gutterBottom className={classes.title}>
					<span>Meus</span> Cursos
				</Typography>
				<SearchInput onChange={handleSearchCourse} />
			</div>
			{ongoing.length > 0 && (
				<div>
					<Typography variant="h4" component="h3" gutterBottom className={classes.subtitle}>
						Em Andamento
					</Typography>
					<Grid container spacing={10} className={classes.grid}>
						{ongoing.map((course) => (
							<Grid item sm={4} key={course.courseId}>
								<CourseCard
									course={{ ...course, id: course.courseId }}
									isFinished={false}
									setSelectedCourse={setSelectedCourse}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)}
			{finished.length > 0 && (
				<div>
					<Typography variant="h4" component="h3" gutterBottom className={classes.subtitle}>
						Concluídos
					</Typography>
					<Grid container spacing={10} className={classes.grid}>
						{finished.map((course) => (
							<Grid item sm={4} key={course.courseId}>
								<CourseCard
									course={{ ...course, id: course.courseId }}
									isFinished
									setSelectedCourse={setSelectedCourse}
								/>
							</Grid>
						))}
					</Grid>
				</div>
			)}
		</main>
	);
}

const mapStateToProps = ({ coursesUser }) => ({
	myCourses: coursesUser.myCourses || [],
	setSelectedCourse: coursesUser.setSelectedCourse,
});

export default connect(mapStateToProps, { ...coursesUser })(withStyles(styles)(MyCourses));
