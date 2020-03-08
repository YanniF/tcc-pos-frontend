import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import {
	Paper,
	Typography,
	Fade,
	Button,
	CircularProgress,
	FormControl,
	TextField,
	InputLabel,
	InputAdornment,
	OutlinedInput,
	IconButton,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormLabel,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import authStyles from './authStyles';

const styles = (theme) => ({
	...theme.properties,
	...authStyles,
	radioGroup: {
		flexDirection: 'row',

		'& label:not(:last-child)': {
			marginRight: '5rem',
		},
	},
});

function Register(props) {
	const [ values, setValues ] = useState({ name: '', email: '', password: '', code: '' });
	const [ userType, setUserType ] = useState('student');
	const [ showPassword, setShowPassword ] = useState(false);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleRegister = (e) => {
		e.preventDefault();

		props.signupUser({ ...values, userType });
	};

	const { classes, loading } = props;

	return (
		<Paper className={classes.paperForm}>
			<form onSubmit={handleRegister}>
				<Fade in={props.showRegister}>
					<React.Fragment>
						<Typography variant="h4" component="h2" gutterBottom align="center">
							Criar Conta
						</Typography>
						<div>
							{/* TODO - add errors */}
							<TextField
								type="text"
								name="name"
								label="Nome completo"
								value={values.name}
								onChange={handleChange}
								variant="outlined"
								className={classes.inputSpacing}
								fullWidth
								required
							/>
							<TextField
								type="email"
								name="email"
								label="Email"
								value={values.email}
								onChange={handleChange}
								variant="outlined"
								className={classes.inputSpacing}
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
									value={values.password}
									onChange={handleChange}
									fullWidth
									className={classes.inputSpacing}
									endAdornment={
										<InputAdornment position="end">
											<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
												{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
											</IconButton>
										</InputAdornment>
									}
									labelWidth={60}
								/>
							</FormControl>
							<FormControl component="fieldset" className={classes.inputSpacing} fullWidth>
								<FormLabel component="legend">Você é:</FormLabel>
								<RadioGroup
									aria-label="user type"
									name="userType"
									value={userType}
									onChange={(e) => setUserType(e.target.value)}
									className={classes.radioGroup}
								>
									<FormControlLabel value="student" control={<Radio color="primary" />} label="Aluno" />
									<FormControlLabel value="supervisor" control={<Radio color="primary" />} label="Supervisor" />
								</RadioGroup>
							</FormControl>
							{userType === 'supervisor' && (
								<TextField
									type="text"
									name="code"
									label="Código"
									variant="outlined"
									value={values.code}
									onChange={handleChange}
									fullWidth
									required
								/>
							)}
						</div>
						<div className={classes.buttons}>
							<Button type="submit" color="primary" variant="contained" className={classes.btnLarge} disabled={loading}>
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