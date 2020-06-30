import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import withStyles from '@material-ui/core/styles/withStyles';
import { useTheme } from '@material-ui/styles';
import { Grid, Paper, Typography, Button, CircularProgress, useMediaQuery } from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import EditIcon from '@material-ui/icons/Edit';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import DeleteIcon from '@material-ui/icons/Delete';

import Image from '../../shared/components/SVG/Professor';
import ButtonIcon from '../../shared/components/ButtonIcon';
import SnackBar from '../../shared/components/SnackBar';
import CourseModal from './CourseModal';
import AddContentModal from './AddContentModal';
import EditContentModal from './EditContentModal';
import DeleteModal from './DeleteModal';
import coursesStyles from '../coursesStyles';
import { coursesAdmin } from '../../store/actions';

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
	btnDisabled: {
		opacity: 0.4,
	},
	textIcon: {
		display: 'flex',
		alignItems: 'center',

		'& svg': {
			marginRight: '.5rem',
		},
	},
	main: {
		order: 1,

		'@media screen and (max-width: 1280px)': {
			order: 2,
			width: '100%',
		}
	},
	sidebar: {
		order: 2,

		'@media screen and (max-width: 1280px)': {
			order: 1,
		}
	},
});

function Details(props) {
	const {
		classes,
		selectedCourse,
		unselectCourse,
		editCourse,
		isRequestingCourses,
		loading,
		errors,
		message,
		courseModalOpen,
		deleteModalOpen,
		setCourseModalVisibility,
		setModalDeleteVisibility,
		setToasterMessage,
	} = props;

	const [ openAddContent, setOpenAddContent ] = useState(false);
	const [ openEditContent, setOpenEditContent ] = useState(false);
	const [ detailsDelete, setDetailsDelete ] = useState({});
	const [ detailsEdit, setDetailsEdit ] = useState(null);

	useEffect(
		() => {
			return () => {
				unselectCourse();
			};
		},
		[ unselectCourse ],
	);

	const theme = useTheme();
	const smallSpacing = useMediaQuery(theme.breakpoints.down('lg'), {
		defaultMatches: true
	});

	const handleSetVisibilityAddContent = (open) => {
		props.clearCourseErrors();
		setOpenAddContent(open);
	};

	const handleSetVisibilityEditContent = (open, id, type) => {
		const content = selectedCourse[type + 's'] && selectedCourse[type + 's'].find((item) => item.id === id);
		setDetailsEdit({ content, type });
		props.clearCourseErrors();
		setOpenEditContent(open);
	};

	const handleSetVisibilityDelete = (open, { id, title, type }) => {
		setDetailsDelete({ id, title, type });
		props.clearCourseErrors();
		setModalDeleteVisibility(open);
	};

	const handleDelete = () => {
		const type = {
			módulo: 'modules',
			'material complementar': 'documents',
			vídeo: 'videos',
			teste: 'tests',
		};
		props.deleteContent(selectedCourse.id, detailsDelete.id, type[detailsDelete.type]);
	};

	return (
		<main className={classes.main}>
			{isRequestingCourses ? (
				<div className={classes.loaderWrapper}>
					<CircularProgress size={170} color="primary" />
				</div>
			) : (
				<React.Fragment>
					<Grid container spacing={smallSpacing ? 5 : 10}>
						<Grid item lg={8} md={12} className={classes.main}>
							<Paper className={classes.paper}>
								<div className={classes.wrapper}>
									<Typography variant="h4" component="h3">
										{selectedCourse.title}
									</Typography>
									<span>
										<ButtonIcon tip="Editar Curso" onClick={() => setCourseModalVisibility(true)}>
											<EditIcon color="primary" />
										</ButtonIcon>
									</span>
								</div>
								{selectedCourse.modules &&
								selectedCourse.modules.length > 0 && (
									<TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
										{selectedCourse.modules.map((module) => (
											<TreeItem
												key={module.id}
												nodeId={module.id}
												label={
													<div className={classes.labelItem}>
														<Typography variant="h6" component="h4">
															{module.title}
														</Typography>
														<span>
															<ButtonIcon
																tip="Editar Módulo"
																onClick={(e) => {
																	handleSetVisibilityEditContent(true, module.id, 'module');
																	e.stopPropagation();
																}}
															>
																<EditIcon color="primary" fontSize="small" />
															</ButtonIcon>
															<ButtonIcon
																tip="Apagar Módulo"
																onClick={(e) => {
																	handleSetVisibilityDelete(true, {
																		id: module.id,
																		title: module.title,
																		type: 'módulo',
																	});
																	e.stopPropagation();
																}}
															>
																<DeleteIcon color="primary" />
															</ButtonIcon>
														</span>
													</div>
												}
											>
												{selectedCourse.videos.map(
													(video) =>
														video.moduleId === module.id ? (
															<TreeItem
																key={video.id}
																nodeId={video.id}
																label={
																	<div className={classes.labelSubItem}>
																		<Typography className={classes.textIcon}>
																			<VideoLibraryIcon fontSize="small" /> {video.title}
																		</Typography>
																		<ButtonIcon
																			tip="Apagar Vídeo"
																			onClick={(e) => {
																				handleSetVisibilityDelete(true, {
																					id: video.id,
																					title: video.title,
																					type: 'vídeo',
																				});
																				e.stopPropagation();
																			}}
																		>
																			<DeleteIcon color="primary" />
																		</ButtonIcon>
																	</div>
																}
															/>
														) : (
															<span key={Math.random()} />
														),
												)}
												{selectedCourse.documents.map(
													(doc) =>
														doc.moduleId === module.id ? (
															<TreeItem
																key={doc.id}
																nodeId={doc.id}
																label={
																	<div className={classes.labelSubItem}>
																		<Typography className={classes.textIcon}>
																			<InsertDriveFileIcon fontSize="small" /> {doc.title}
																		</Typography>
																		<ButtonIcon
																			tip="Apagar Material Complementar"
																			onClick={(e) => {
																				handleSetVisibilityDelete(true, {
																					id: doc.id,
																					title: doc.title,
																					type: 'material complementar',
																				});
																				e.stopPropagation();
																			}}
																		>
																			<DeleteIcon color="primary" />
																		</ButtonIcon>
																	</div>
																}
															/>
														) : (
															<span key={Math.random()} />
														),
												)}
												{selectedCourse.tests.map(
													(test) =>
														test.moduleId === module.id ? (
															<TreeItem
																key={test.id}
																nodeId={test.id}
																label={
																	<div className={classes.labelSubItem}>
																		<Typography className={classes.textIcon}>
																			<SpeakerNotesIcon fontSize="small" /> {test.title}
																		</Typography>
																		<span>
																			<ButtonIcon
																				tip="Editar Teste"
																				onClick={(e) => {
																					handleSetVisibilityEditContent(true, test.id, 'test');
																					e.stopPropagation();
																				}}
																			>
																				<EditIcon color="primary" fontSize="small" />
																			</ButtonIcon>
																			<ButtonIcon
																				tip="Apagar Teste"
																				onClick={(e) => {
																					handleSetVisibilityDelete(true, {
																						id: test.id,
																						title: test.title,
																						type: 'teste',
																					});
																					e.stopPropagation();
																				}}
																			>
																				<DeleteIcon color="primary" />
																			</ButtonIcon>
																		</span>
																	</div>
																}
															/>
														) : (
															<span key={Math.random()} />
														),
												)}
											</TreeItem>
										))}
									</TreeView>
								)}
							</Paper>
						</Grid>
						<Grid item lg={4} md={12} sm={12} className={classes.sidebar}>
							<Paper className={classes.paper}>
								<Image height="200px" width="100%" />
								<Button
									color="secondary"
									variant="contained"
									className={classes.btnLarge}
									onClick={() => handleSetVisibilityAddContent(true)}
								>
									Adicionar Conteúdo
								</Button>
							</Paper>
						</Grid>
					</Grid>
					{courseModalOpen && (
						<CourseModal
							open={courseModalOpen}
							setVisibility={setCourseModalVisibility}
							course={selectedCourse}
							editCourse={editCourse}
							loading={loading}
							errors={errors}
						/>
					)}
					{openAddContent && <AddContentModal open={openAddContent} setVisibility={handleSetVisibilityAddContent} />}
					{openEditContent && (
						<EditContentModal
							open={openEditContent}
							item={detailsEdit}
							setVisibility={handleSetVisibilityEditContent}
						/>
					)}
					{deleteModalOpen && (
						<DeleteModal
							open={deleteModalOpen}
							setVisibility={setModalDeleteVisibility}
							item={detailsDelete}
							handleDelete={handleDelete}
							loading={loading}
							errors={errors}
						/>
					)}
				</React.Fragment>
			)}
			<SnackBar message={message} setToasterMessage={setToasterMessage} />
		</main>
	);
}

const mapStateToProps = ({ coursesAdmin }) => ({
	courseModalOpen: coursesAdmin.courseModalOpen || false,
	deleteModalOpen: coursesAdmin.deleteModalOpen || false,
	selectedCourse: coursesAdmin.selectedCourse || {},
	isRequestingCourses: coursesAdmin.isRequestingCourses || false,
	loading: coursesAdmin.loading || false,
	errors: coursesAdmin.errors || {},
	message: coursesAdmin.message,
});

const mapDispatchToProps = {
	setCourseModalVisibility: coursesAdmin.setModalVisibility,
	setModalDeleteVisibility: coursesAdmin.setModalDeleteVisibility,
	unselectCourse: coursesAdmin.unselectCourse,
	clearCourseErrors: coursesAdmin.clearCourseErrors,
	setToasterMessage: coursesAdmin.setToasterMessage,
	editCourse: coursesAdmin.editCourse,
	deleteContent: coursesAdmin.deleteContent,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Details));
