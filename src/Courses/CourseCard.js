import React from 'react';
import PropTypes from 'prop-types';

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

function CourseCard(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const { course: { title, teacher, image, rating }, isFinished } = props;

	return (
		<Card>
			<CardMedia image={image} title={title} style={{ paddingTop: '56.25%', objectFit: 'cover' }} />
			<CardHeader
				action={
					isFinished && (
						<IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={title}
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
					<Rating name="read-only" value={rating.rating} precision={0.5} readOnly />
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

export default CourseCard;
