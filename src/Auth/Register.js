import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import authStyles from './authStyles';

const styles = (theme) => ({
	...theme.properties,
	...authStyles,
	InputSpacing: {
		marginTop: 15,
		marginBottom: 15,
	},
	radioGroup: {
		flexDirection: 'row',

		'& label:not(:last-child)': {
			marginRight: '5rem',
		},
	},
});

function Register(props) {
	const [ userType, setUserType ] = useState('student');
	const [ showPassword, setShowPassword ] = useState(false);

	const handleRegister = () => {
		props.authStart();
	};

	const { classes, loading } = props;

	return (
		<Paper className={classes.paperAuth}>
			<form>
				<Fade in={props.showRegister}>
					<React.Fragment>
						<Typography variant="h4" component="h3" gutterBottom align="center">
							Criar Conta
						</Typography>
						<div>
							{/* TODO - add errors */}
							<TextField
								type="text"
								name="firstname"
								label="Nome"
								variant="outlined"
								className={classes.InputSpacing}
								fullWidth
								required
							/>
							<TextField
								type="text"
								name="lastname"
								label="Sobrenome"
								variant="outlined"
								className={classes.InputSpacing}
								fullWidth
								required
							/>
							<TextField
								type="email"
								name="email"
								label="Email"
								variant="outlined"
								className={classes.InputSpacing}
								fullWidth
								required
							/>
							<FormControl variant="outlined" fullWidth required>
								<InputLabel htmlFor="password" style={{ marginTop: '18px' }}>
									Senha
								</InputLabel>
								<OutlinedInput
									type={showPassword ? 'text' : 'password'}
									id="password"
									name="password"
									fullWidth
									className={classes.InputSpacing}
									endAdornment={
										<InputAdornment position="end">
											<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={60}
								/>
							</FormControl>
							<FormControl component="fieldset" className={classes.InputSpacing} fullWidth>
								<FormLabel component="legend">Você é:</FormLabel>
								<RadioGroup
									aria-label="user type"
									name="userType"
									onChange={(e) => setUserType(e.target.value)}
									className={classes.radioGroup}
								>
									<FormControlLabel value="student" control={<Radio color="primary" />} label="Aluno" />
									<FormControlLabel value="supervisor" control={<Radio color="primary" />} label="Supervisor" />
								</RadioGroup>
							</FormControl>
							{userType === 'supervisor' && (
								<TextField type="text" name="code" label="Código" variant="outlined" fullWidth required />
							)}
						</div>
						<div className={classes.buttons}>
							<Button
								color="primary"
								variant="contained"
								onClick={handleRegister}
								className={classes.btnLarge}
								disabled={loading}
							>
								{loading ? <CircularProgress size={24} color="primary" /> : 'Criar Conta'}
							</Button>
							<Button
								color="secondary"
								variant="contained"
								className={classes.btnLarge}
								onClick={props.changeForm}
								disabled={loading}
							>
								Fazer Login
							</Button>
						</div>
					</React.Fragment>
				</Fade>
			</form>
		</Paper>
	);
}

Register.propTypes = {
	showRegister: PropTypes.bool,
	changeForm: PropTypes.func,
	loading: PropTypes.bool,
	authStart: PropTypes.func,
	classes: PropTypes.object,
};

export default withStyles(styles)(Register);
