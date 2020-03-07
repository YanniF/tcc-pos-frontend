import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function Module(props) {
	const { classes } = props;

	return (
		<div>
			<TextField id="title" label="Título" className={classes.inputSpacing} variant="outlined" fullWidth required />
		</div>
	);
}

export default withStyles(styles)(Module);
