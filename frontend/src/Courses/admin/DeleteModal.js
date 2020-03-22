import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	CircularProgress,
} from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function DeleteModal(props) {
	const { deleteCourse, open, setVisibility, loading, course: { title, id } } = props;

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="sm" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography variant="body1">Deseja realmente apagar este curso?</Typography>
			</DialogContent>
			<DialogActions style={{ marginRight: '1rem' }}>
				<Button onClick={() => setVisibility(false)} color="primary">
					Cancelar
				</Button>
				<Button onClick={() => deleteCourse(id)} color="secondary">
					{loading ? <CircularProgress size={24} color="primary" /> : 'Apagar'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)(DeleteModal);
