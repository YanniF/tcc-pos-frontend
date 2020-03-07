import React, { useState } from 'react';

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
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import coursesStyles from '../coursesStyles';

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
});

function Ratings({ classes }) {
	const [ open, setOpen ] = useState(false);

	const ratings = [
		{ id: 1, rating: 4.5, comment: 'Muito bom' },
		{ id: 2, rating: 3.5, comment: 'kkkkkk' },
		{
			id: 3,
			rating: 4,
			comment:
				"I love this course and the instructor. Great speaking voice, very clear and pleasant to listen to (very important). I went through all the study examples and although some things were a bit above my head, I learned a lot. I wasn't able to complete all the homework but I'm determined to learn Excel and will take the course over again",
		},
		{ id: 4, rating: 1, comment: 'Muito bom. Adorei. 1 estrela' },
	];

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Paper className={classes.paper}>
				<div className={classes.top}>
					<Typography variant="h4" component="h3" gutterBottom>
						Avaliações
					</Typography>
					{/* se o aluno terminou o curso */}
					<Button color="secondary" variant="contained" onClick={handleOpen}>
						Fazer avaliação
					</Button>
				</div>
				{ratings.map((rat, index) => (
					<div className={index === ratings.length - 1 ? classes.groupLast : classes.group} key={rat.id}>
						<Rating value={rat.rating} precision={0.5} size="large" readOnly />
						<Typography variant="body1" component="p" className={classes.comment}>
							{rat.comment}
						</Typography>
					</div>
				))}
			</Paper>
			<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
				<DialogTitle>Titulo do curso</DialogTitle>
				<DialogContent>
					<Rating name="rating" precision={0.5} size="large" className={classes.mb} />
					<TextField
						id="comment"
						label="Comentário"
						multiline
						rows={3}
						variant="outlined"
						fullWidth
						className={classes.mb}
					/>
				</DialogContent>
				<DialogActions style={{ marginRight: '1rem' }}>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleClose} color="secondary" autoFocus>
						Avaliar
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

export default withStyles(styles)(Ratings);
