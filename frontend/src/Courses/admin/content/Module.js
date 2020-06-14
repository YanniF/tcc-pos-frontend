import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function Module(props) {
	const { classes, values, onChange, errors } = props;

	return (
		<div>
			<TextField
				id="title"
				name="title"
				value={values.title}
				label="Título"
				onChange={({ target }) => onChange(target.name, target.value)}
				className={classes.inputSpacing}
				variant="outlined"
				helperText={errors.title}
				error={!!errors.title}
				fullWidth
				required
			/>
		</div>
	);
}

export default withStyles(styles)(Module);
