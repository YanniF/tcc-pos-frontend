import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Input from '../shared/components/Input/Input';
import Checkbox from '../shared/components/Checkbox/Checkbox';

const styles = (theme) => ({
	...theme.properties,
	btnLarge: {
		...theme.properties.btnLarge,
		width: '100%',
	},
	buttons: {
		display: 'flex',
		marginTop: '4rem',
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
							<Input type="email" name="email" label="E-mail" required />
							<Input type="password" name="password" label="Senha" required />
							<Checkbox
								name="lembrar"
								label="Manter logado"
								checked={rememberMe}
								onChange={() => setRememberMe(!rememberMe)}
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
