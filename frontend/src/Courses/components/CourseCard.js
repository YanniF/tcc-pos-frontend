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
import EditIcon from '@material-ui/icons/Edit';
import Assignment from '@material-ui/icons/Assignment';

import { truncateLongText } from '../../shared/util/utility';
import placeholder from '../../shared/assets/placeholder.jpg';
import ButtonIcon from '../../shared/components/ButtonIcon';

const styles = (theme) => ({
	...theme.properties,
	image: {
		position: 'relative',
		paddingTop: '56.25%',
		objectFit: 'cover',
		transition: 'opacity .2s',

		'&:hover': {
			opacity: 0.9,
		},
	},
	placeholderText: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		fontSize: '2em',
		color: '#fff',
		textAlign: 'center',
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
	cardHeader: {
		position: 'relative',
	},
	btnEditImage: {
		position: 'absolute',
		top: '1rem',
		right: '1rem',
		backgroundColor: 'rgba(0,0,0, .3)',
	},
});

function CourseCard(props) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const {
		course: { id, title, category, description, thumbnail, rating, numberOfRatings, enrolledCount, finishedCount },
		isFinished,
		isAdmin,
		classes,
		isEnrolled,
		setSelectedCourse,
		setModalDeleteVisibility,
		setModalImageCourseVisibility,
		setModalVisibility,
	} = props;

	const isFinishedLinks = [
		{ id: 1, text: 'Avaliar', link: `/courses/${id}/details`, onClick: () => setSelectedCourse(id) },
		{ id: 2, text: 'Certificado', link: `/courses/${id}/certificate`, onClick: () => setSelectedCourse(id) }
	];

	const isAdminLinks = [
		{ id: 1, text: 'Detalhes', link: `/admin/courses/${id}/details`, onClick: () => setSelectedCourse(id) },
		{ id: 2, text: 'Editar', link: `/admin/courses/${id}/details`, onClick: () => handleEdit(id) },
		{
			id: 3,
			text: 'Excluir',
			link: '',
			disabled: enrolledCount !== 0,
			onClick: () => setModalDeleteVisibility(true, id),
		},
	];

	const linkCourse = isEnrolled ? `/courses/${id}/tutorial` : `/courses/${id}/details`;

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

	const handleEditImage = () => {
		setModalImageCourseVisibility(true, id);
	};

	const handleEdit = (id) => {
		setSelectedCourse(id);
		setModalVisibility(true);
	};

	// TODO: fix card height
	return (
		<Card>
			<div className={classes.cardHeader}>
				<Link to={linkCourse} onClick={() => setSelectedCourse(id)}>
					{thumbnail ? (
						<CardMedia image={thumbnail} title={title} className={classes.image} />
					) : (
						<div style={{ backgroundImage: `url(${placeholder})` }} className={classes.image}>
							<span className={classes.placeholderText}>{title}</span>
						</div>
					)}
				</Link>
				{isAdmin && (
					<ButtonIcon tip="Editar imagem do curso" btnClassName={classes.btnEditImage} onClick={handleEditImage}>
						<EditIcon color="secondary" />
					</ButtonIcon>
				)}
			</div>
			<CardHeader
				action={
					(isFinished || isAdmin) && (
						<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
							<MoreVertIcon />
						</IconButton>
					)
				}
				title={
					<Link to={linkCourse} className={classes.decoratedLink} onClick={() => setSelectedCourse(id)}>
						{title}
					</Link>
				}
				subheader={category}
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
									{isFinished && isFinishedLinks.map((menu) => menuLink(menu))}
									{isAdmin && isAdminLinks.map((menu) => menuLink(menu))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>

			<CardContent>
				<Link to={linkCourse} style={{ textDecoration: 'none' }} onClick={() => setSelectedCourse(id)}>
					<Typography variant="body1" color="textSecondary" component="p">
						{truncateLongText(description, 250)}
					</Typography>
				</Link>
				<div style={{ display: 'flex', marginTop: '1rem' }}>
					<Rating value={+rating} precision={0.5} readOnly />
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
