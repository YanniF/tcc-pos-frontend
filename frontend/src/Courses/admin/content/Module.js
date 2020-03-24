import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function Module(props) {
	const { classes, values, onChange } = props;

	return (
		<div>
			<TextField
				id="title"
				name="title"
				value={values.title}
				label="Título"
				onChange={(e) => onChange(e.target.name, e.target.value)}
				className={classes.inputSpacing}
				variant="outlined"
				fullWidth
				required
			/>
		</div>
	);
}

export default withStyles(styles)(Module);
