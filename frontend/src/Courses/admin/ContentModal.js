import React, { useState } from 'react';
import { connect } from 'react-redux';

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
	CircularProgress,
} from '@material-ui/core';

import { courses } from '../../store/actions';
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
	const { classes, open, setVisibility, loading, selectedCourse, addContent } = props;

	const [ type, setType ] = useState('module');
	const [ moduleValues, setModuleValues ] = useState({ title: '' });
	const [ videoValues, setVideoValues ] = useState({
		module: selectedCourse.modules.length && selectedCourse.modules[0].id,
		title: '',
		link: '',
	});
	const [ documentValues, setDocumentValues ] = useState({
		module: selectedCourse.modules.length && selectedCourse.modules[0].id,
		title: '',
		file: {},
	});

	const typeFields = {
		module: <Module values={moduleValues} onChange={(name, value) => setModuleValues({ [name]: value })} />,
		video: (
			<Video
				modules={selectedCourse.modules}
				values={videoValues}
				onChange={(name, value) => setVideoValues({ ...videoValues, [name]: value })}
			/>
		),
		document: (
			<Document
				modules={selectedCourse.modules}
				values={documentValues}
				onChange={(name, value) => setDocumentValues({ ...documentValues, [name]: value })}
			/>
		),
		test: <Test />,
	};

	const resetState = () => {
		setModuleValues({ title: '' });
		setVideoValues({ module: selectedCourse.modules.length && selectedCourse.modules[0].id, title: '', link: '' });
		setDocumentValues({ module: selectedCourse.modules.length && selectedCourse.modules[0].id, title: '', file: {} });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (type === 'module') {
			addContent('modules', selectedCourse.id, moduleValues);
		}
		else if (type === 'video') {
			addContent('videos', selectedCourse.id, videoValues);
		}
		else if (type === 'document') {
			const formData = new FormData();
			formData.append(documentValues.title, documentValues.file, documentValues.file.name);
			formData.append('module', documentValues.module);

			addContent('documents', selectedCourse.id, formData);
		}
		resetState();
	};

	const handleCancel = () => {
		setVisibility(false);
		resetState();
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{selectedCourse.title}</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<FormControl component="fieldset" fullWidth>
						<FormLabel component="legend">Você deseja adicionar um:</FormLabel>
						<RadioGroup
							name="type"
							onChange={(e) => setType(e.target.value)}
							value={type}
							className={classes.radioGroup}
						>
							<FormControlLabel value="module" control={<Radio color="primary" />} label="Módulo" />
							<FormControlLabel
								value="video"
								control={<Radio color="primary" disabled={!selectedCourse.modules.length} />}
								label="Vídeo"
							/>
							<FormControlLabel
								value="document"
								control={<Radio color="primary" disabled={!selectedCourse.modules.length} />}
								label="Material Complementar"
							/>
							<FormControlLabel
								value="test"
								control={<Radio color="primary" disabled={!selectedCourse.modules.length} />}
								label="Teste"
							/>
						</RadioGroup>
					</FormControl>
					<Divider className={classes.divider} />
					{typeFields[type]}
				</DialogContent>
				<DialogActions style={{ marginRight: '1rem' }}>
					<Button onClick={handleCancel} color="primary" disabled={loading}>
						Cancelar
					</Button>
					<Button type="submit" color="secondary" autoFocus>
						{loading ? <CircularProgress size={24} color="primary" /> : 'Salvar'}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

const mapStateToProps = ({ courses }) => ({
	selectedCourse: courses.selectedCourse || {},
	loading: courses.loading || false,
});

const mapDispatchToProps = {
	addContent: courses.addContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ContentModal));
