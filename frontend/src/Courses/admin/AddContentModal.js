import React, { useState, useEffect } from 'react';
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
	Collapse,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { coursesAdmin } from '../../store/actions';
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

function AddContentModal(props) {
	const { classes, open, setVisibility, loading, selectedCourse, addContent, errors } = props;

	const [ type, setType ] = useState('module');
	const [ moduleValues, setModuleValues ] = useState({ title: '' });
	const [ videoValues, setVideoValues ] = useState({
		moduleId: selectedCourse.modules.length && selectedCourse.modules[0].id,
		title: '',
		link: '',
	});
	const [ documentValues, setDocumentValues ] = useState({
		moduleId: selectedCourse.modules.length && selectedCourse.modules[0].id,
		title: '',
		file: {},
	});
	const [ testValues, setTestValues ] = useState({
		moduleId: selectedCourse.modules.length && selectedCourse.modules[0].id,
		title: '',
		questions: [
			{
				question: '',
				options: [ { id: '', title: '' } ],
				points: '',
				answer: '',
			},
		],
	});
	const [ showAlert, setShowAlert ] = useState(false);

	useEffect(
		() => {
			const { errors } = props;

			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ props ],
	);

	const typeFields = {
		module: (
			<Module values={moduleValues} errors={errors} onChange={(name, value) => setModuleValues({ [name]: value })} />
		),
		video: (
			<Video
				modules={selectedCourse.modules}
				values={videoValues}
				errors={errors}
				onChange={(name, value) => setVideoValues({ ...videoValues, [name]: value })}
			/>
		),
		document: (
			<Document
				modules={selectedCourse.modules}
				values={documentValues}
				errors={errors}
				onChange={(name, value) => setDocumentValues({ ...documentValues, [name]: value })}
			/>
		),
		test: (
			<Test
				modules={selectedCourse.modules}
				values={testValues}
				errors={errors}
				onChange={(name, value) => setTestValues({ ...testValues, [name]: value })}
			/>
		),
	};

	const resetState = () => {
		setModuleValues({ title: '' });
		setVideoValues({ moduleId: selectedCourse.modules.length && selectedCourse.modules[0].id, title: '', link: '' });
		setDocumentValues({ moduleId: selectedCourse.modules.length && selectedCourse.modules[0].id, title: '', file: {} });
		setTestValues({
			module: selectedCourse.modules.length && selectedCourse.modules[0].id,
			title: '',
			questions: [
				{
					question: '',
					options: [ { id: '', title: '' } ],
					points: '',
					answer: '',
				},
			],
		});
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
			formData.append('moduleId', documentValues.moduleId);

			addContent('documents', selectedCourse.id, formData);
		}
		else if (type === 'test') {
			addContent('tests', selectedCourse.id, testValues);
		}
		resetState();
	};

	const handleCancel = () => {
		setVisibility(false);
		resetState();
	};

	const handleSetType = (value) => {
		props.clearCourseErrors();
		setShowAlert(false);
		setType(value);
	};

	return (
		<Dialog open={open} onClose={() => setVisibility(false)} maxWidth="md" fullWidth>
			<DialogTitle>{selectedCourse.title}</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<Collapse in={showAlert}>
						<Alert
							severity="error"
							action={
								<IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowAlert(false)}>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							style={{ marginBottom: '20px' }}
						>
							{errors && errors.error}
						</Alert>
					</Collapse>
					<FormControl component="fieldset" fullWidth>
						<FormLabel component="legend">Você deseja adicionar um:</FormLabel>
						<RadioGroup
							name="type"
							onChange={(e) => handleSetType(e.target.value)}
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

const mapStateToProps = ({ coursesAdmin }) => ({
	selectedCourse: coursesAdmin.selectedCourse || {},
	loading: coursesAdmin.loading || false,
	errors: coursesAdmin.errors || {},
});

const mapDispatchToProps = {
	addContent: coursesAdmin.addContent,
	clearCourseErrors: coursesAdmin.clearCourseErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddContentModal));
