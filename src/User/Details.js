import React, { useState } from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Typography, Tooltip, IconButton } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  ...theme.properties,
  paper: {
    padding: "1.5rem",
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between'
	}
});

function Stats(props) {
	const [ isEditing, setIsEditing ] = useState(false)
  const { classes } = props;

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
				<div className={classes.title}>
					<Typography variant="h5" component="h3" gutterBottom>
						Informações Pessoais
					</Typography>
					<Tooltip title='Editar' placement="top">
						<IconButton onClick={() => setIsEditing(true)}>
							<EditIcon color="secondary" />
						</IconButton>
					</Tooltip>
				</div>
      </Paper>
    </React.Fragment>
  );
}

Stats.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Stats);
