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

	const { classes } = props;

	const handleUploadFile = (e) => {
		const { files = [] } = e.target;
		seFileName(files[0].name);
	};

	return (
		<div>
			<FormControl variant="outlined" fullWidth className={classes.inputSpacing}>
				<InputLabel id="module">Módulo</InputLabel>
				<Select labelId="module" id="module" labelWidth={55}>
					<MenuItem value={10}>Módulo 1</MenuItem>
					<MenuItem value={20}>Módulo 2</MenuItem>
					<MenuItem value={30}>Módulo 3</MenuItem>
				</Select>
			</FormControl>
			<TextField id="title" label="Título" className={classes.inputSpacing} variant="outlined" fullWidth required />
			<input accept="image/*" className={classes.hidden} id="upload" type="file" onChange={handleUploadFile} required />
			<label htmlFor="upload">
				<Button variant="contained" color="primary" component="span" className={classes.fileButton}>
					Adicionar Material Complementar
				</Button>
				<span style={{ paddingLeft: '1rem' }}>{fileName}</span>
			</label>
		</div>
	);
}

export default withStyles(styles)(Document);
