import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Typography,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField,
	CircularProgress,
	IconButton,
	Collapse,
} from '@material-ui/core';
import { Rating, Alert } from '@material-ui/lab';
import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';

import SnackBar from '../../shared/components/SnackBar';
import coursesStyles from '../coursesStyles';
import { coursesUser } from '../../store/actions';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	top: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	group: {
		...coursesStyles.group,
		paddingBottom: '2rem',
		borderBottom: '2px solid rgba(0, 0, 0, .1)',
	},
	groupLast: {
		...coursesStyles.group,
		marginBottom: 0,
		paddingBottom: 0,
	},
	comment: {
		margin: '1rem 5px',
	},
	mb: {
		marginBottom: '1.5rem',
	},
	loaderWrapper: {
		...coursesStyles.loaderWrapper,
		height: 'initial',
	},
	noRatings: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '1.2rem',
	},
	noRatingsText: {
		marginLeft: '15px',
	},
});

function Ratings({
	classes,
	isRequestingRatings,
	ratings,
	isOpen,
	setVisibilityRatingsModal,
	addRating,
	errors,
	courseId,
	setToasterMessage,
	message,
}) {
	const [ showAlert, setShowAlert ] = useState(false);
	const [ rating, setRating ] = useState(0);
	const [ comment, setComment ] = useState('');

	useEffect(
		() => {
			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ errors ],
	);

	const handleOpen = () => {
		setVisibilityRatingsModal(true);
	};

	const handleClose = () => {
		setVisibilityRatingsModal(false);
	};

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<div className={classes.top}>
					<Typography variant="h4" component="h3" gutterBottom>
						Avaliações
					</Typography>
					{/* TODO: verificar se o aluno terminou o curso */}
					<Button color="secondary" variant="contained" onClick={handleOpen}>
						Fazer avaliação
					</Button>
				</div>
				{isRequestingRatings ? (
					<div className={classes.loaderWrapper}>
						<CircularProgress size={100} color="primary" />
					</div>
				) : ratings.length > 0 ? (
					ratings.map((rat, index) => (
						<div className={index === ratings.length - 1 ? classes.groupLast : classes.group} key={rat.id}>
							<Rating value={rat.rating} precision={0.5} size="large" readOnly />
							<Typography variant="body1" component="p" className={classes.comment}>
								{rat.comment}
							</Typography>
						</div>
					))
				) : (
					<div className={classes.noRatings}>
						<GradeIcon style={{ color: '#ffb400', fontSize: 40 }} />
						<Typography variant="h6" component="p" className={classes.noRatingsText}>
							Este curso ainda não possui avaliações
						</Typography>
					</div>
				)}
			</Paper>
			<Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>Titulo do curso</DialogTitle>
				<DialogContent>
					<Collapse in={showAlert}>
						<Alert
							severity="error"
							action={
								<IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowAlert(false)}>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							style={{ marginBottom: '20px' }}
						>
							{errors && errors.error}
						</Alert>
					</Collapse>
					<Rating
						name="rating"
						precision={0.5}
						size="large"
						onChange={({ target }) => setRating(target.value)}
						className={classes.mb}
					/>
					<TextField
						id="comment"
						label="Comentário"
						multiline
						rows={3}
						variant="outlined"
						onChange={({ target }) => setComment(target.value)}
						fullWidth
						className={classes.mb}
					/>
				</DialogContent>
				<DialogActions style={{ marginRight: '1rem' }}>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={() => addRating(courseId, { rating, comment })} color="secondary" autoFocus>
						{isRequestingRatings ? <CircularProgress size={24} color="primary" /> : 'Avaliar'}
					</Button>
				</DialogActions>
			</Dialog>
			<SnackBar message={message} setToasterMessage={setToasterMessage} />
		</React.Fragment>
	);
}

const mapStateToProps = ({ coursesUser }) => ({
	isRequestingRatings: coursesUser.isRequestingRatings,
	isOpen: coursesUser.isOpenRatingsModal,
	ratings: (coursesUser.selectedCourse && coursesUser.selectedCourse.ratings) || [],
	courseId: coursesUser.selectedCourse && coursesUser.selectedCourse.id,
	errors: coursesUser.errors,
	message: coursesUser.message,
});

const mapDispatchToProps = {
	addRating: coursesUser.addRating,
	setVisibilityRatingsModal: coursesUser.setVisibilityRatingsModal,
	setToasterMessage: coursesUser.setToasterMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Ratings));
