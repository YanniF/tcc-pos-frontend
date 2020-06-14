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
	Divider,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Assignment from '@material-ui/icons/Assignment';

import image from '../../shared/assets/thumb1.jpg';

const styles = (theme) => ({
	...theme.properties,
	image: {
		paddingTop: '56.25%',
		objectFit: 'cover',
		transition: 'opacity .2s',

		'&:hover': {
			opacity: 0.9,
		},
	},
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '1rem',

		'& svg': {
			paddingRight: '.8rem',
		},
	},
	divider: {
		marginTop: '1rem',
	},
});

function CourseCard(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const {
		course: { id, title, teacher, description, rating, numberOfRatings, enrolledCount, finishedCount },
		isFinished,
		isAdmin,
		classes,
		setSelectedCourse,
		setModalDeleteVisibility,
	} = props;

	const isFinishedLinks = [ { id: 1, text: 'Avaliar', link: '/' }, { id: 2, text: 'Certificado', link: '/' } ];

	const isAdminLinks = [
		{ id: 1, text: 'Detalhes', link: `/admin/courses/${id}/details`, onClick: () => setSelectedCourse(id) },
		{ id: 2, text: 'Editar', link: `/admin/courses/${id}/details`, onClick: () => setSelectedCourse(id) },
		{
			id: 3,
			text: 'Excluir',
			link: '',
			disabled: enrolledCount !== 0,
			onClick: () => setModalDeleteVisibility(true, id),
		},
	];

	const menuLink = ({ id, text, link, disabled, onClick }) => {
		if (link) {
			return (
				<Link to={link} key={id} className={classes.undecoratedLink}>
					<MenuItem disabled={disabled} onClick={onClick}>
						{text}
					</MenuItem>
				</Link>
			);
		}
		else {
			return (
				<MenuItem key={id} disabled={disabled} onClick={onClick}>
					{text}
				</MenuItem>
			);
		}
	};
	// TODO: fix card height
	return (
		<Card>
			<Link to={`/courses/${id}/tutorial`}>
				<CardMedia image={image} title={title} className={classes.image} />
			</Link>
			<CardHeader
				action={
					(isFinished || isAdmin) && (
						<IconButton aria-label="settings" onClick={(e) => setAnchorEl(e.currentTarget)}>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					<Link to={`/courses/${id}/details`} className={classes.decoratedLink}>
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
									{isFinished && isFinishedLinks.map(({ id, text, link }) => menuLink(id, text, link))}
									{isAdmin && isAdminLinks.map((menu) => menuLink(menu))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>

			<CardContent>
				<Link to={`/courses/${id}/details`} style={{ textDecoration: 'none' }}>
					<Typography variant="body1" color="textSecondary" component="p">
						{description}
					</Typography>
				</Link>
				<div style={{ display: 'flex', marginTop: '1rem' }}>
					<Rating value={rating} precision={0.5} readOnly />
					<Typography component="legend" color="textSecondary" style={{ marginLeft: '.5rem' }}>
						{numberOfRatings} avaliações
					</Typography>
				</div>
				{isAdmin && (
					<React.Fragment>
						<Divider className={classes.divider} />
						<Typography variant="body1" color="textSecondary" component="div" className={classes.wrapper}>
							<PeopleAlt /> Matriculados: {enrolledCount} alunos
						</Typography>
						<Typography variant="body1" color="textSecondary" component="div" className={classes.wrapper}>
							<Assignment /> Concluídos: {finishedCount} alunos
						</Typography>
					</React.Fragment>
				)}
			</CardContent>
		</Card>
	);
}

CourseCard.propTypes = {
	course: PropTypes.object,
};

export default withStyles(styles)(CourseCard);
