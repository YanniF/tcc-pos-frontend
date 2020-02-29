import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
	Typography,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
	...theme.properties,
	panelDisabled: {
		backgroundColor: 'rgba(0, 0, 0, .05) !important',
	},
	details: {
		paddingBottom: '8px',
		cursor: 'pointer',
		transition: 'background .3s',

		'&:hover': {
			backgroundColor: 'rgba(0, 0, 0, .05)',
		},
	},
});

function Sidebar(props) {
	const { classes } = props;

	const courses = [
		{
			title: 'Modulo 1',
			items: [
				{
					title: 'video 1',
					watched: true,
				},
				{
					title: 'video 2',
					watched: false,
				},
				{
					title: 'video 3',
					watched: false,
				},
				{
					title: 'Test 1',
					watched: false,
				},
			],
		},
		{
			title: 'Modulo 2',
			items: [
				{
					title: 'video 1',
					watched: true,
				},
				{
					title: 'video 2',
					watched: false,
				},
				{
					title: 'video 3',
					watched: false,
				},
				{
					title: 'video 3',
					watched: false,
				},
			],
			tests: [],
		},
		{
			title: 'Modulo 3',
			items: [
				{
					title: 'video 1',
					watched: true,
				},
				{
					title: 'video 2',
					watched: false,
				},
				{
					title: 'video 3',
					watched: false,
				},
			],
			tests: [],
		},
	];
	return (
		<aside>
			<React.Fragment>
				{courses.map((course) => (
					<ExpansionPanel key={Math.random() * 1000}>
						<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
							<Typography variant="h6" component="h4">
								{course.title}
							</Typography>
						</ExpansionPanelSummary>
						{course.items.map((item) => (
							<ExpansionPanelDetails
								key={Math.random() * 1000}
								className={classes.details}
								onClick={() => console.log('click!')}
							>
								<FormControlLabel
									onClick={(event) => event.stopPropagation()}
									onFocus={(event) => event.stopPropagation()}
									control={<Checkbox color="primary" />}
									label={item.title}
								/>
							</ExpansionPanelDetails>
						))}
					</ExpansionPanel>
				))}

				<ExpansionPanel disabled className={classes.panelDisabled}>
					<ExpansionPanelSummary>
						<Typography>Emitir Certificado</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>
				<ExpansionPanel disabled className={classes.panelDisabled}>
					<ExpansionPanelSummary>
						<Typography>Avaliar Curso</Typography>
					</ExpansionPanelSummary>
				</ExpansionPanel>
			</React.Fragment>
		</aside>
	);
}

export default withStyles(styles)(Sidebar);
