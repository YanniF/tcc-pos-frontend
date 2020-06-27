import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Checkbox } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = (theme) => ({
	...theme.properties,
	panelDisabled: {
		backgroundColor: 'rgba(0, 0, 0, .05) !important',
	},
	details: {
		display: 'flex',
		alignItems: 'center',
		paddingBottom: '8px',
		cursor: 'pointer',
		transition: 'background .3s',

		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, .05)',
		},
	},
	contentTitle: {
		marginTop: '-5px',
	},
	contentDocumentTitle: {
		display: 'flex',
		alignItems: 'center',
		padding: '9px 15px 9px 9px',
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
	downloadIcon: {
		marginRight: '9px',
	},
});

function Sidebar(props) {
	const { classes, selectedCourse, myCourse, setSelectedContent, handleWatchedVideos, showRatingsPage } = props;

	const handleOnClick = (e, id, type) => {
		e.stopPropagation();
		const content = selectedCourse[type].find((item) => id === item.id);

		setSelectedContent(content);
	};

	// TODO: exibir mensagem se nao houver conteudo
	return (
		<aside>
			<React.Fragment>
				{selectedCourse.modules &&
					selectedCourse.modules.map((module, index) => (
						<ExpansionPanel key={module.id} defaultExpanded={index === 0}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography variant="h6" component="h4">
									{module.title}
								</Typography>
							</ExpansionPanelSummary>
							{selectedCourse.videos &&
								selectedCourse.videos.map((video) => {
									const hasFinishedVideo = myCourse.finishedVideos.filter((item) => item.id === video.id);

									if (video.moduleId === module.id) {
										return (
											<ExpansionPanelDetails
												key={video.id}
												className={classes.details}
												onClick={(e) => handleOnClick(e, video.id, 'videos')}
											>
												<Checkbox
													color="primary"
													checked={!!hasFinishedVideo.length}
													disabled={myCourse.hasFinishedCourse}
													onChange={() => handleWatchedVideos(video.id, module.id, !hasFinishedVideo.length)}
												/>
												<span className={classes.contentTitle}>{video.title}</span>
											</ExpansionPanelDetails>
										);
									}
									else return null;
								})}
							{selectedCourse.tests &&
								selectedCourse.tests.map(
									(test) =>
										test.moduleId === module.id && (
											<ExpansionPanelDetails
												key={test.id}
												className={classes.details}
												onClick={(e) => handleOnClick(e, test.id, 'tests')}
											>
												<Checkbox color="primary" value={myCourse.finishedVideos.includes(test.id)} />
												<span className={classes.contentTitle}>{test.title}</span>
											</ExpansionPanelDetails>
										),
								)}
							{selectedCourse.documents &&
								selectedCourse.documents.map(
									(document) =>
										document.moduleId === module.id && (
											<ExpansionPanelDetails key={document.id} className={classes.details}>
												<a
													className={classes.contentDocumentTitle}
													href={document.documentUrl}
													target="_blank"
													rel="noopener noreferrer"
												>
													<GetAppIcon className={classes.downloadIcon} />
													{document.title}
												</a>
											</ExpansionPanelDetails>
										),
								)}
						</ExpansionPanel>
					))}

				<ExpansionPanel
					disabled={!myCourse.hasFinishedCourse}
					className={!myCourse.hasFinishedCourse ? classes.panelDisabled : ''}
				>
					<ExpansionPanelSummary>
						<Typography>Emitir Certificado</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>
				<ExpansionPanel
					disabled={!myCourse.hasFinishedCourse}
					className={!myCourse.hasFinishedCourse ? classes.panelDisabled : ''}
					onClick={showRatingsPage}
				>
					<ExpansionPanelSummary>
						<Typography>Avaliar Curso</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>
			</React.Fragment>
		</aside>
	);
}

export default withStyles(styles)(Sidebar);
