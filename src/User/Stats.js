import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import { Paper, Typography } from "@material-ui/core";

const styles = theme => ({
  ...theme.properties,
  paper: {
    padding: "1.5rem 3rem",
  },
  number: {
    marginRight: '.8rem',
    fontSize: '3.5rem',
		color: theme.palette.secondary.dark,
  },
  text: {
    fontSize: '1.2rem',
  }
});

function Stats(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3" gutterBottom align="center">
          Estatísticas
        </Typography>
        <p className={classes.text}>
          <span className={classes.number}>2</span>cursos em andamento
        </p>
        <p className={classes.text}>
          <span className={classes.number}>5</span>cursos concluídos
        </p>
      </Paper>
    </React.Fragment>
  );
}

Stats.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Stats);
