import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	CircularProgress,
	Collapse,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { courses } from '../../store/actions';
import Module from './content/Module';
import Test from './content/Test';

const styles = (theme) => ({
	...theme.properties,
});

function EditContentModal(props) {
	const { open, setVisibility, loading, selectedCourse, editContent, errors, item: { content, type } } = props;

	const [ moduleValues, setModuleValues ] = useState({ title: content.title || '' });
	const [ showAlert, setShowAlert ] = useState(false);

	useEffect(
		() => {
			const { errors } = props;

			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ props ],
	);

	const typeFields = {
		module: (
			<Module values={moduleValues} errors={errors} onChange={(name, value) => setModuleValues({ [name]: value })} />
		),
		test: <Test />,
	};

	const resetState = () => {
		setModuleValues({ title: '' });
		// clearCourseErrors()
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (type === 'module') {
			editContent('modules', selectedCourse.id, { id: content.id, ...moduleValues });
		}
		// TODO: move to redux store
		setVisibility(false);
		resetState();
	};

	const handleCancel = () => {
		setVisibility(false);
		resetState();
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{selectedCourse.title}</DialogTitle>
			<form onSubmit={handleSubmit}>
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
					{typeFields[type]}
				</DialogContent>
				<DialogActions style={{ marginRight: '1rem' }}>
					<Button onClick={handleCancel} color="primary" disabled={loading}>
						Cancelar
					</Button>
					<Button type="submit" color="secondary" autoFocus>
						{loading ? <CircularProgress size={24} color="primary" /> : 'Salvar'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

const mapStateToProps = ({ courses }) => ({
	selectedCourse: courses.selectedCourse || {},
	loading: courses.loading || false,
	errors: courses.errors || {},
});

const mapDispatchToProps = {
	editContent: courses.editContent,
	clearCourseErrors: courses.clearCourseErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EditContentModal));