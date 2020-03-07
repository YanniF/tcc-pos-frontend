import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function Video(props) {
	const { classes } = props;

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
			<TextField id="link" label="Link" className={classes.inputSpacing} variant="outlined" fullWidth required />
		</div>
	);
}

export default withStyles(styles)(Video);
