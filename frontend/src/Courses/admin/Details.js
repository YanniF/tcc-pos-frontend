import React, { useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import Image from '../../shared/components/SVG/Professor';
import ButtonIcon from '../../shared/components/ButtonIcon';
import CourseModal from './CourseModal';
import ContentModal from './ContentModal';
import coursesStyles from '../coursesStyles';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,

	wrapper: {
		...coursesStyles.centered,
		marginBottom: '2rem',
	},
	labelItem: {
		...coursesStyles.centered,
		paddingRight: '.5rem',
	},
	labelSubItem: {
		...coursesStyles.centered,
		paddingRight: '.5rem',
		paddingLeft: '.8rem',
	},
	btnLarge: {
		marginTop: '1rem',
		padding: '.7rem',
		width: '100%',
	},
	textIcon: {
		display: 'flex',
		alignItems: 'center',

		'& svg': {
			marginRight: '.5rem',
		},
	},
});

function Details(props) {
	const [ openCourse, setOpenCourse ] = useState(false);
	const [ openContent, setOpenContent ] = useState(false);
	const { classes } = props;

	const handleSetVisibilityCourse = (open) => {
		setOpenCourse(open);
	};

	const handleSetVisibilityContent = (open) => {
		setOpenContent(open);
	};

	return (
		<main className={classes.main}>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					<Paper className={classes.paper}>
						<div className={classes.wrapper}>
							<Typography variant="h4" component="h3">
								Um titulo super interessante interessante
							</Typography>
							<ButtonIcon tip="Editar Curso" onClick={() => handleSetVisibilityCourse(true)}>
								<EditIcon color="primary" />
							</ButtonIcon>
						</div>
						<TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
							<TreeItem
								nodeId="1"
								label={
									<div className={classes.labelItem}>
										<Typography variant="h6" component="h4">
											Módulo 1
										</Typography>
										<ButtonIcon tip="Editar Módulo" onClick={() => handleSetVisibilityContent(true)}>
											<EditIcon color="primary" fontSize="small" />
										</ButtonIcon>
									</div>
								}
							>
								<TreeItem
									nodeId="2"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<VideoLibraryIcon fontSize="small" /> Video 1
											</Typography>
											<ButtonIcon tip="Editar Vídeo" onClick={() => handleSetVisibilityContent(true)}>
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
								<TreeItem
									nodeId="3"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<VideoLibraryIcon fontSize="small" /> Video 2
											</Typography>
											<ButtonIcon tip="Editar Vídeo">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
								<TreeItem
									nodeId="4"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<VideoLibraryIcon fontSize="small" /> Video 3
											</Typography>
											<ButtonIcon tip="Editar Vídeo">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
							</TreeItem>
							<TreeItem
								nodeId="5"
								label={
									<div className={classes.labelItem}>
										<Typography variant="h6" component="h4">
											Módulo 2
										</Typography>
										<ButtonIcon tip="Editar Módulo">
											<EditIcon color="primary" fontSize="small" />
										</ButtonIcon>
									</div>
								}
							>
								<TreeItem
									nodeId="6"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<VideoLibraryIcon fontSize="small" /> Video 1
											</Typography>
											<ButtonIcon tip="Editar Vídeo">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
								<TreeItem
									nodeId="7"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<VideoLibraryIcon fontSize="small" /> Video 2
											</Typography>
											<ButtonIcon tip="Editar Vídeo">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
								<TreeItem
									nodeId="8"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<SpeakerNotesIcon fontSize="small" /> Teste
											</Typography>
											<ButtonIcon tip="Editar Teste">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
								<TreeItem
									nodeId="9"
									label={
										<div className={classes.labelSubItem}>
											<Typography className={classes.textIcon}>
												<InsertDriveFileIcon fontSize="small" /> Documento
											</Typography>
											<ButtonIcon tip="Editar Material Complementar">
												<EditIcon color="primary" fontSize="small" />
											</ButtonIcon>
										</div>
									}
								/>
							</TreeItem>
						</TreeView>
					</Paper>
				</Grid>
				<Grid item sm={4}>
					<Paper className={classes.paper}>
						<Image height="200px" width="400px" />
						<Button
							color="secondary"
							variant="contained"
							className={classes.btnLarge}
							onClick={() => console.log('matricular')}
						>
							Adicionar Conteúdo
						</Button>
					</Paper>
				</Grid>
			</Grid>
			<CourseModal open={openCourse} setVisibility={handleSetVisibilityCourse} />
			<ContentModal open={openContent} setVisibility={handleSetVisibilityContent} />
		</main>
	);
}

export default withStyles(styles)(Details);
