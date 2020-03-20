import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	CircularProgress,
} from '@material-ui/core';

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
	const { classes, open, setVisibility, addCourse, loading } = props;

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
		addCourse(values);
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{values.title || 'Novo Curso'}</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						id="title"
						name="title"
						label="Título"
						variant="outlined"
						value={values.title}
						onChange={handleChange}
						className={classes.inputSpacing}
						fullWidth
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
					<Button onClick={() => setVisibility(false)} color="primary">
						Cancelar
					</Button>
					<Button type="submit" color="secondary">
						{loading ? <CircularProgress size={24} color="primary" /> : 'Cadastrar Curso'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default withStyles(styles)(CourseModal);
