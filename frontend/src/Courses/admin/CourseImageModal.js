import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	CircularProgress,
	Collapse,
	IconButton,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import { coursesAdmin } from '../../store/actions'

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

function CourseImageModal(props) {
  const [ showAlert, setShowAlert ] = useState(false);
	const [ file, setFile ] = useState({});
  
  const { addCourseImage, setVisibilityCourseImageModal, open, selectedCourse, errors, classes, isSavingImage } = props

  useEffect(
		() => {
			const { errors } = props;

			if (errors && errors.error) {
				setShowAlert(true);
			}
		},
		[ props ],
  );

  const handleUploadFile = (e) => {
		const { files = [] } = e.target;
		setFile(files[0].name);
  };
  
	const handleSubmit = (e) => {
		e.preventDefault();
    addCourseImage(file);
  };

  const handleCancel = () => {
		setVisibilityCourseImageModal(false);
    setFile({})
	};

  return (
    <Dialog open={open} onClose={() => setVisibilityCourseImageModal(false)} maxWidth="sm" fullWidth>
			<DialogTitle>{selectedCourse.title}</DialogTitle>
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
				<input
						accept="image/*"
						className={classes.hidden}
						id="thumbnail"
						name="thumbnail"
						type="file"
						onChange={handleUploadFile}
					/>
					<label htmlFor="thumbnail">
						<Button variant="contained" color="primary" component="span" className={classes.fileButton}>
							Adicionar Imagem do Curso
						</Button>
						<span style={{ paddingLeft: '1rem' }}>{file.name}</span>
					</label>
			</DialogContent>
			<DialogActions style={{ marginRight: '1rem' }}>
				<Button onClick={() => handleCancel()} color="primary">
					Cancelar
				</Button>
				<Button onClick={() => handleSubmit()} color="secondary">
					{isSavingImage ? <CircularProgress size={24} color="primary" /> : 'Apagar'}
				</Button>
			</DialogActions>
		</Dialog>
  )
}

const mapStateToProps = ({ coursesAdmin }) => ({
	isSavingImage: coursesAdmin.isSavingImage || false,
	open: coursesAdmin.imageCourseModalOpen,
	selectedCourse: coursesAdmin.selectedCourse || {},
	errors: coursesAdmin.errors || {},
	message: coursesAdmin.message,
});

const mapDispatchToProps = {
	setModalImageCourseVisibility: coursesAdmin.setModalImageCourseVisibility,
	addCourseImage: coursesAdmin.addCourse,
	setToasterMessage: coursesAdmin.setToasterMessage,
	clearCourseErrors: coursesAdmin.clearCourseErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CourseImageModal));
