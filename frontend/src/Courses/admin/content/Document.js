import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';

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

function Document(props) {
	const [ fileName, seFileName ] = useState('');

	const { classes, modules, values, onChange } = props;

	const handleUploadFile = (e) => {
		const file = e.target.files[0];
		seFileName(file.name);

		/* const formData = new FormData();
		formData.append('file', file, file.name);
		onChange('file', formData); */
		onChange('file', file);
	};

	return (
		<div>
			<FormControl variant="outlined" fullWidth className={classes.inputSpacing}>
				<InputLabel id="module">Módulo</InputLabel>
				<Select
					labelId="module"
					id="module"
					name="module"
					labelWidth={55}
					value={values.module}
					onChange={(e) => onChange(e.target.name, e.target.value)}
				>
					{modules.map((module) => (
						<MenuItem key={module.id} value={module.id}>
							{module.title}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<TextField
				id="title"
				name="title"
				value={values.title}
				label="Título"
				className={classes.inputSpacing}
				variant="outlined"
				onChange={(e) => onChange(e.target.name, e.target.value)}
				fullWidth
				required
			/>
			<input className={classes.hidden} id="file" name="file" type="file" onChange={handleUploadFile} required />
			<label htmlFor="file">
				<Button variant="contained" color="primary" component="span" className={classes.fileButton}>
					Adicionar Material Complementar
				</Button>
				<span style={{ paddingLeft: '1rem' }}>{fileName}</span>
			</label>
		</div>
	);
}

export default withStyles(styles)(Document);
