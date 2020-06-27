import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

import Sidebar from './components/Sidebar';
import Player from './components/Player';
// import Test from './components/CourseTest';
import { coursesUser } from '../store/actions';
import coursesStyles from './coursesStyles';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	title: {
		marginBottom: '2rem',
		fontWeight: '300',
		color: theme.palette.primary.main,
	},
});

function ViewTutorial(props) {
	const {
		classes,
		selectedCourse: { id, title, modules = [], videos = [] },
		getCourseDetails,
		isRequestingCourseDetails,
		selectedCourse,
		myCourses,
		updateWatchedVideos,
		setFinishedCourse,
		showRatingsPage,
		history,
		setHideNavbar,
	} = props;
	const [ selectedContent, setSelectedContent ] = useState({});

	const myCourse = myCourses && myCourses.filter((course) => course.courseId === selectedCourse.id)[0];

	useEffect(
		() => {
			getCourseDetails(id);
			setHideNavbar(false);
		},
		[ getCourseDetails, id, setHideNavbar ],
	);

	useEffect(
		() => {
			if (modules.length && modules[0]) {
				const moduleId = modules[0].id;
				const item = videos.filter((video) => video.moduleId === moduleId);

				if (item) setSelectedContent(item[0]);
			}
		},
		[ modules, id, videos ],
	);

	const handleWatchedVideos = (id, moduleId, value) => {
		let myCourse = myCourses.filter((course) => course.courseId === selectedCourse.id)[0];

		if (value) {
			if (myCourse.finishedVideos.filter((item) => item.id === id).length > 0) return;

			myCourse.finishedVideos.push({ id, moduleId });

			const selectedCourseVideosIds = selectedCourse.videos.map((video) => video.id).sort().join(',');
			const myCourseVideosIds = myCourse.finishedVideos.map((video) => video.id).sort().join(',');

			if (selectedCourseVideosIds === myCourseVideosIds) {
				setFinishedCourse(selectedCourse.id, myCourse.id);
			}
		}
		else {
			myCourse.finishedVideos = myCourse.finishedVideos.filter((video) => video.id !== id);
		}
		updateWatchedVideos(selectedCourse.id, myCourse.id, myCourse.finishedVideos);
	};

	return (
		<main className={classes.main}>
			{isRequestingCourseDetails ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<React.Fragment>
					<Typography variant="h4" component="h2" gutterBottom className={classes.title}>
						{title}
					</Typography>
					<Grid container spacing={10}>
						<Grid item sm={8}>
							<Player video={selectedContent} onEnded={handleWatchedVideos} />
							{/* <Test /> */}
						</Grid>
						<Grid item sm={4}>
							<Sidebar
								selectedCourse={selectedCourse}
								myCourse={myCourse}
								setSelectedContent={setSelectedContent}
								handleWatchedVideos={handleWatchedVideos}
								showRatingsPage={() => showRatingsPage(id, history)}
							/>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</main>
	);
}

const mapStateToProps = ({ coursesUser }) => ({
	isRequestingCourseDetails: coursesUser.isRequestingCourseDetails,
	selectedCourse: coursesUser.selectedCourse || {},
	myCourses: coursesUser.myCourses || [],
});

export default connect(mapStateToProps, { ...coursesUser })(withStyles(styles)(ViewTutorial));
