import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography, CircularProgress } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import coursesStyles from './coursesStyles';
import Ratings from './components/Ratings';
import Image from '../shared/components/SVG/PressPlay';
import placeholder from '../shared/assets/placeholder.jpg';
import { coursesUser } from '../store/actions';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	title: {
		margin: '2rem 0 1.5rem',
	},
	btnLarge: {
		marginTop: '1rem',
		padding: '.7rem',
		width: '100%',
	},
	thumbnail: {
		margin: '0 auto',
		width: '100%',
		maxHeight: '350px',
		objectFit: 'cover',
		borderRadius: '5px',
	},
	image: {
		position: 'relative',
		paddingTop: '30%',
		objectFit: 'cover',
		borderRadius: '5px',
	},
	placeholderText: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontSize: '2.5em',
		color: '#fff',
		textAlign: 'center',
	},
});
function CourseDetails(props) {
	const {
		classes,
		isRequestingCourseDetails,
		selectedCourse,
		enrollInCourse,
		isRequestingEnrollCourse,
		getAllRatingsByCourse,
		history,
	} = props;

	useEffect(
		() => {
			getAllRatingsByCourse(selectedCourse.id);
		},
		[ getAllRatingsByCourse, selectedCourse.id ],
	);

	return (
		<main className={classes.main}>
			{isRequestingCourseDetails ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<React.Fragment>
					<Grid container spacing={10}>
						<Grid item sm={8}>
							<Paper className={classes.paper}>
								{selectedCourse.thumbnail ? (
									<img src={selectedCourse.thumbnail} alt={selectedCourse.title} className={classes.thumbnail} />
								) : (
									<div style={{ backgroundImage: `url(${placeholder})` }} className={classes.image}>
										<span className={classes.placeholderText}>{selectedCourse.title}</span>
									</div>
								)}
								<div className={classes.title}>
									<Typography variant="h4" component="h3" gutterBottom>
										{selectedCourse.title}
									</Typography>
									{/* TODO: filter courses by category */}
									<Typography variant="body1" color="textSecondary">
										<strong>Categoria: </strong>
										<Link to="/" className={classes.decoratedLink}>
											{selectedCourse.category}
										</Link>
									</Typography>
								</div>
								<Typography variant="body1" component="p" gutterBottom>
									{selectedCourse.description}
								</Typography>
							</Paper>
						</Grid>
						<Grid item sm={4}>
							<Paper className={classes.paper}>
								<Image height="200px" width="400px" />
								<Button
									color="secondary"
									variant="contained"
									className={classes.btnLarge}
									disabled={isRequestingEnrollCourse}
									onClick={
										selectedCourse.isEnrolled ? (
											() => history.push(`/courses/${selectedCourse.id}/tutorial`)
										) : (
											enrollInCourse
										)
									}
								>
									{isRequestingEnrollCourse ? (
										<CircularProgress size={24} color="primary" />
									) : selectedCourse.isEnrolled ? (
										'Assistir aulas'
									) : (
										'Matricular'
									)}
								</Button>
								<div className={classes.group}>
									<Typography variant="body1" color="primary" component="p">
										Professor(a)
									</Typography>
									<Typography variant="h4" component="p">
										{selectedCourse.teacher}
									</Typography>
								</div>
								<div className={classes.group} style={{ marginBottom: 0 }}>
									<Typography variant="body1" color="primary" component="p">
										Avaliações
									</Typography>
									<Rating value={+selectedCourse.rating} precision={0.5} size="large" readOnly />
								</div>
							</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={10}>
						<Grid item sm={8}>
							<Ratings />
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</main>
	);
}

const mapStateToProps = ({ coursesUser }) => ({
	isRequestingCourseDetails: coursesUser.isRequestingCourseDetails,
	isRequestingEnrollCourse: coursesUser.isRequestingEnrollCourse,
	selectedCourse: coursesUser.selectedCourse || {},
});

export default connect(mapStateToProps, { ...coursesUser })(withStyles(styles)(CourseDetails));
