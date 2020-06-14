import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const styles = (theme) => ({
	...theme.properties,
});

function Video(props) {
	const { classes, modules, values, onChange, errors } = props;

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
				helperText={errors.title}
				error={!!errors.title}
				fullWidth
				required
			/>
			<TextField
				id="link"
				name="link"
				value={values.link}
				label="Link"
				className={classes.inputSpacing}
				variant="outlined"
				onChange={(e) => onChange(e.target.name, e.target.value)}
				helperText={errors.link}
				error={!!errors.link}
				fullWidth
				required
			/>
		</div>
	);
}

export default withStyles(styles)(Video);
