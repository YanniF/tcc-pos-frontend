import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';

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
	const [ title, seTitle ] = useState('');
	const [ fileName, seFileName ] = useState('');
	const { classes, open, setVisibility, addCourse } = props;

	const handleUploadFile = (e) => {
		const { files = [] } = e.target;
		seFileName(files[0].name);
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{title || 'Novo Curso'}</DialogTitle>
			<DialogContent>
				<form>
					<TextField
						id="title"
						label="Título"
						variant="outlined"
						value={title}
						onChange={(e) => seTitle(e.target.value)}
						className={classes.inputSpacing}
						fullWidth
						required
					/>
					<TextField
						id="teacher"
						label="Professor"
						variant="outlined"
						className={classes.inputSpacing}
						fullWidth
						required
					/>
					<TextField
						id="category"
						label="Categoria"
						variant="outlined"
						className={classes.inputSpacing}
						fullWidth
						required
					/>
					<TextField
						id="description"
						label="Descrição"
						multiline
						rows={3}
						variant="outlined"
						className={classes.inputSpacing}
						fullWidth
					/>
					<input
						accept="image/*"
						className={classes.hidden}
						id="upload"
						type="file"
						onChange={handleUploadFile}
						required
					/>
					<label htmlFor="upload">
						<Button variant="contained" color="primary" component="span" className={classes.fileButton}>
							Adicionar Imagem do Curso
						</Button>
						<span style={{ paddingLeft: '1rem' }}>{fileName}</span>
					</label>
				</form>
			</DialogContent>
			<DialogActions style={{ marginRight: '1rem' }}>
				<Button onClick={() => setVisibility(false)} color="primary">
					Cancelar
				</Button>
				<Button onClick={addCourse} color="secondary" autoFocus>
					Cadastrar Curso
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)(CourseModal);
