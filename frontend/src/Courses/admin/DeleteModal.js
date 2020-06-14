import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	CircularProgress,
	Collapse,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';

const styles = (theme) => ({
	...theme.properties,
});

function DeleteModal(props) {
	const [ showAlert, setShowAlert ] = useState(false);
	const { handleDelete, open, setVisibility, loading, item: { id, title, type = 'item' }, errors } = props;

	useEffect(
		() => {
			const { errors } = props;

			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ props ],
	);

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="sm" fullWidth>
			<DialogTitle>{title}</DialogTitle>
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
				<Typography variant="body1">Deseja realmente apagar este {type}?</Typography>
			</DialogContent>
			<DialogActions style={{ marginRight: '1rem' }}>
				<Button onClick={() => setVisibility(false)} color="primary">
					Cancelar
				</Button>
				<Button onClick={() => handleDelete(id)} color="secondary">
					{loading ? <CircularProgress size={24} color="primary" /> : 'Apagar'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)(DeleteModal);
