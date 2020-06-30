import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { useTheme } from '@material-ui/styles';
import { Grid, Paper, Button, Typography, CircularProgress, useMediaQuery } from '@material-ui/core';
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
	main: {
		order: 1,

		'@media screen and (max-width: 1290px)': {
			order: 2,
			width: '100%',
		}
	},
	sidebar: {
		width: '100%',
		order: 2,

		'@media screen and (max-width: 1290px)': {
			order: 1,
		}
	},
	sidebarGroup: {
		'@media screen and (max-width: 1270px)': {
			display: 'flex',
			justifyContent: 'space-between'
		},
		'@media screen and (max-width: 600px)': {
			flexDirection: 'column',
		}
	}
});

function CourseDetails(props) {
	const {
		classes,
		isRequestingCourseDetails,
		selectedCourseUser,
		selectedCourseAdmin,
		enrollInCourse,
		isRequestingEnrollCourse,
		getAllRatingsByCourse,
		history,
		isAdmin,
	} = props;

	const selectedCourse = isAdmin ? selectedCourseAdmin : selectedCourseUser;

	useEffect(
		() => {
			getAllRatingsByCourse(selectedCourse.id);
		},
		[ getAllRatingsByCourse, selectedCourse.id ],
	);

	const theme = useTheme();
	const smallSpacing = useMediaQuery(theme.breakpoints.down('lg'), {
		defaultMatches: true
	});

	return (
		<main className={classes.main}>
			{isRequestingCourseDetails ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<React.Fragment>
					<Grid container spacing={smallSpacing ? 5 : 10}>
						<Grid item lg={8} md={12} className={classes.main}>
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
						<Grid item lg={4} md={12} className={classes.sidebar}>
							<Paper className={classes.paper}>
								<Image height="200px" width="100%" />
								{!isAdmin && (
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
								)}
								<div className={classes.sidebarGroup}>
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
								</div>
							</Paper>
						</Grid>
					</Grid>
					<Grid container spacing={smallSpacing ? 5 : 10}>
						<Grid item lg={8} md={12} sm={12}>
							<Ratings />
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</main>
	);
}

const mapStateToProps = ({ coursesUser, coursesAdmin, auth }) => ({
	isRequestingCourseDetails: coursesUser.isRequestingCourseDetails,
	isRequestingEnrollCourse: coursesUser.isRequestingEnrollCourse,
	selectedCourseUser: coursesUser.selectedCourse || {},
	selectedCourseAdmin: coursesAdmin.selectedCourse || {},
	isAdmin: auth.user && auth.user.admin,
});

export default connect(mapStateToProps, { ...coursesUser })(withStyles(styles)(CourseDetails));
