import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
	...theme.properties,
	btnLarge: {
		...theme.properties.btnLarge,
		width: '100%',
	},
	buttons: {
		display: 'flex',
		marginTop: '3rem',
		'& button:not(:last-child)': {
			marginRight: '3rem',
		},
	},
});

function Login(props) {
	const [ rememberMe, setRememberMe ] = useState(true);

	const handleLogin = () => {
		props.authStart();
	};

	const { classes, loading } = props;

	return (
		<Paper className={classes.paperAuth}>
			<form>
				<Fade in={props.showLogin}>
					<React.Fragment>
						<Typography variant="h4" component="h3" gutterBottom align="center">
							Bem-vindo(a)
						</Typography>
						<div>
							{/* TODO - add errors */}
							<TextField type="email" id="email" name="email" label="Email" variant="outlined" fullWidth required />
							<TextField
								type="password"
								id="password"
								name="password"
								label="Senha"
								variant="outlined"
								fullWidth
								required
							/>

							<FormControlLabel
								control={
									<Checkbox
										name="lembrar"
										label="Manter logado"
										color="primary"
										icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 40 }} />}
										checkedIcon={<CheckBoxIcon style={{ fontSize: 40 }} />}
										checked={rememberMe}
										onChange={() => setRememberMe(!rememberMe)}
									/>
								}
								label="Manter logado"
							/>
						</div>
						<div className={classes.buttons}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleLogin}
								className={classes.btnLarge}
								disabled={loading}
							>
								{loading ? <CircularProgress size={24} color="primary" /> : 'Acessar Sistema'}
							</Button>
							<Button
								color="secondary"
								variant="contained"
								className={classes.btnLarge}
								onClick={props.changeForm}
								disabled={loading}
							>
								Criar Conta
							</Button>
						</div>
					</React.Fragment>
				</Fade>
			</form>
		</Paper>
	);
}

Login.propTypes = {
	showLogin: PropTypes.bool,
	changeForm: PropTypes.func,
	loading: PropTypes.bool,
	authStart: PropTypes.func,
	classes: PropTypes.object,
};

export default withStyles(styles)(Login);
