import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList,
	ClickAwayListener,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = (theme) => ({
	...theme.properties,
});

function CourseCard(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const { course: { id, title, teacher, image, rating }, isFinished } = props;
	const { classes } = props;

	return (
		<Card>
			<Link to={`/courses/${id}/details`}>
				<CardMedia image={image} title={title} style={{ paddingTop: '56.25%', objectFit: 'cover' }} />
			</Link>
			<CardHeader
				action={
					isFinished && (
						<IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					<Link to={`/courses/${id}/details`} className={classes.link}>
						{title}
					</Link>
				}
				subheader={teacher}
			/>
			<Popper open={!!anchorEl} anchorEl={anchorEl} transition disablePortal>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
					>
						<Paper>
							<ClickAwayListener onClickAway={() => setAnchorEl(null)}>
								<MenuList autoFocusItem={!!anchorEl} id="menu-list-grow">
									<MenuItem onClick={() => console.log('Avaliações')}>Avaliação</MenuItem>
									<MenuItem onClick={() => console.log('Certificado')}>Certificado</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="p">
					This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of
					frozen peas along with the mussels, if you like.
				</Typography>
				<div style={{ display: 'flex', marginTop: '1rem' }}>
					<Rating value={rating.rating} precision={0.5} readOnly />
					<Typography component="legend" color="textSecondary" style={{ marginLeft: '.5rem' }}>
						{rating.numberOfRatings} avaliações
					</Typography>
				</div>
			</CardContent>
		</Card>
	);
}

CourseCard.propTypes = {
	course: PropTypes.object,
};

export default withStyles(styles)(CourseCard);
