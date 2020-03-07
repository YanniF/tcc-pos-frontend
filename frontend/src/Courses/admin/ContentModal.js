import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	FormControl,
	FormControlLabel,
	FormLabel,
	RadioGroup,
	Radio,
	Divider,
} from '@material-ui/core';

import Module from './content/Module';
import Video from './content/Video';
import Document from './content/Document';
import Test from './content/Test';

const styles = (theme) => ({
	...theme.properties,
	radioGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	divider: {
		margin: '1rem 0',
	},
});

function ContentModal(props) {
	const [ type, setType ] = useState('module');
	const { classes, open, setVisibility } = props;

	const typeFields = {
		module: <Module />,
		video: <Video />,
		document: <Document />,
		test: <Test />,
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>Titulo do Curso</DialogTitle>
			<DialogContent>
				<FormControl component="fieldset" fullWidth>
					<FormLabel component="legend">Você deseja adicionar um:</FormLabel>
					<RadioGroup name="type" onChange={(e) => setType(e.target.value)} value={type} className={classes.radioGroup}>
						<FormControlLabel value="module" control={<Radio color="primary" />} label="Módulo" />
						<FormControlLabel value="video" control={<Radio color="primary" />} label="Vídeo" />
						<FormControlLabel value="document" control={<Radio color="primary" />} label="Material Complementar" />
						<FormControlLabel value="test" control={<Radio color="primary" />} label="Teste" />
					</RadioGroup>
				</FormControl>
				<Divider className={classes.divider} />
				{typeFields[type]}
			</DialogContent>
			<DialogActions style={{ marginRight: '1rem' }}>
				<Button onClick={() => setVisibility(false)} color="primary">
					Cancelar
				</Button>
				<Button onClick={() => setVisibility(false)} color="secondary" autoFocus>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default withStyles(styles)(ContentModal);
