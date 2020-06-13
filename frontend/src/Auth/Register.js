import React, { useState, useEffect } from 'react';
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
	Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CloseIcon from '@material-ui/icons/Close';

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
	const [ showAlert, setShowAlert ] = useState(false);

	useEffect(
		() => {
			const { errors } = props;

			if (errors && errors.general) {
				setShowAlert(true);
			}
		},
		[ props ],
	);

	const handleChange = (e) => {
		const { value, name } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleRegister = (e) => {
		e.preventDefault();

		props.signupUser({ ...values, userType });
	};

	const { classes, loading, errors } = props;

	return (
		<Paper className={classes.paperForm}>
			<Collapse in={showAlert}>
				<Alert
					severity="error"
					action={
						<IconButton aria-label="close" color="inherit" size="small" onClick={() => setShowAlert(false)}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					style={{ marginBottom: '20px' }}
				>
					{errors && errors.general}
				</Alert>
			</Collapse>
			<form onSubmit={handleRegister}>
				<Fade in={props.showRegister}>
					<React.Fragment>
						<Typography variant="h4" component="h2" gutterBottom align="center">
							Criar Conta
						</Typography>
						<div>
							<TextField
								type="text"
								name="name"
								label="Nome completo"
								value={values.name}
								onChange={handleChange}
								variant="outlined"
								className={classes.inputSpacing}
								helperText={errors.name}
								error={!!errors.name}
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
								helperText={errors.email}
								error={!!errors.email}
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
									helpertext={errors.password}
									error={!!errors.password}
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
									helperText={errors.code}
									error={!!errors.code}
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
