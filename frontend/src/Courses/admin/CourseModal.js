import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	CircularProgress,
	Collapse,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
	...theme.properties,
	hidden: {
		display: 'none',
	},
	fileButton: {
		...theme.properties.btnLarge,
		...theme.properties.inputSpacing,
	},
});

function CourseModal(props) {
	const [ values, setValues ] = useState({ title: '', teacher: '', category: '', description: '' });
	const [ fileName, seFileName ] = useState('');
	const [ showAlert, setShowAlert ] = useState(false);

	const { classes, open, setVisibility, addCourse, editCourse, loading, course, errors } = props;

	useEffect(
		() => {
			if (!!course) {
				const { title, teacher, category, description } = course;
				setValues({ id: course.id, title, teacher, category, description });
			}

			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ course, errors ],
	);

	const handleUploadFile = (e) => {
		const { files = [] } = e.target;
		seFileName(files[0].name);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!!course) {
			editCourse(values);
		}
		else {
			addCourse(values);
		}
	};

	const handleCancel = () => {
		setVisibility(false);

		if (!!course) {
			const { title, teacher, category, description } = course;
			setValues({ id: course.id, title, teacher, category, description });
		}
		else {
			setValues({ title: '', teacher: '', category: '', description: '' });
		}
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{values.title || 'Novo Curso'}</DialogTitle>
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
					<TextField
						id="title"
						name="title"
						label="Título"
						variant="outlined"
						value={values.title}
						onChange={handleChange}
						className={classes.inputSpacing}
						fullWidth
						helperText={errors.title}
						error={!!errors.title}
						required
					/>
					<TextField
						id="teacher"
						name="teacher"
						label="Professor"
						variant="outlined"
						value={values.teacher}
						onChange={handleChange}
						className={classes.inputSpacing}
						fullWidth
						helperText={errors.teacher}
						error={!!errors.teacher}
						required
					/>
					<TextField
						id="category"
						name="category"
						label="Categoria"
						variant="outlined"
						value={values.category}
						onChange={handleChange}
						className={classes.inputSpacing}
						helperText={errors.category}
						error={!!errors.category}
						fullWidth
						required
					/>
					<TextField
						id="description"
						name="description"
						label="Descrição"
						multiline
						rows={3}
						variant="outlined"
						value={values.description}
						onChange={handleChange}
						className={classes.inputSpacing}
						fullWidth
					/>
					<input
						accept="image/*"
						className={classes.hidden}
						id="thumbnail"
						name="thumbnail"
						type="file"
						onChange={handleUploadFile}
					/>
					<label htmlFor="thumbnail">
						<Button variant="contained" color="primary" component="span" className={classes.fileButton}>
							Adicionar Imagem do Curso
						</Button>
						<span style={{ paddingLeft: '1rem' }}>{fileName}</span>
					</label>
				</DialogContent>
				<DialogActions style={{ marginRight: '1rem' }}>
					<Button onClick={handleCancel} color="primary" disabled={loading}>
						Cancelar
					</Button>
					<Button type="submit" color="secondary">
						{loading ? <CircularProgress size={24} color="primary" /> : 'Salvar'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default withStyles(styles)(CourseModal);
