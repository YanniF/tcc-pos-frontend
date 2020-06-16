import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, Divider, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import ButtonIcon from '../../../shared/components/ButtonIcon';
import coursesStyles from '../../coursesStyles';

const styles = (theme) => ({
	...theme.properties,
	...coursesStyles,
	divider: {
		margin: '1rem 0',
	},
	questionGroup: {
		...coursesStyles.centered,
	},
});

function Test(props) {
	const { classes, values, onChange, errors } = props;

	return (
		<div>
			<TextField
				name="title"
				value={values.title}
				label="Título"
				onChange={({ target }) => onChange(target.name, target.value)}
				className={classes.inputSpacing}
				variant="outlined"
				helperText={errors.title}
				error={!!errors.title}
				fullWidth
				required
			/>
			<Divider className={classes.divider} />
			<div className={classes.questionGroup}>
				<span>1.</span>
				<TextField
					name="title"
					value={values.title}
					label="Pergunta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Adicionar Resposta" onClick={() => console.log('haha')}>
					<AddIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<FormControl variant="outlined" fullWidth className={classes.inputSpacing}>
					<InputLabel id="module">Resposta Correta</InputLabel>
					<Select
						labelId="module"
						id="module"
						name="module"
						labelWidth={127}
						value={values.module}
						onChange={(e) => onChange(e.target.name, e.target.value)}
					>
						<MenuItem key={Math.random() * 100}>A</MenuItem>
						<MenuItem key={Math.random() * 100}>B</MenuItem>
						<MenuItem key={Math.random() * 100}>C</MenuItem>
						<MenuItem key={Math.random() * 100}>D</MenuItem>
					</Select>
				</FormControl>
				<TextField
					name="title"
					value={values.title}
					label="Pontos"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
			</div>

			<Divider className={classes.divider} />
			<div className={classes.questionGroup}>
				<span>1.</span>
				<TextField
					name="title"
					value={values.title}
					label="Pergunta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Adicionar Resposta" onClick={() => console.log('haha')}>
					<AddIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
			<div className={classes.questionGroup}>
				<span>A</span>
				<TextField
					name="title"
					value={values.title}
					label="Resposta"
					onChange={({ target }) => onChange(target.name, target.value)}
					className={classes.inputSpacing}
					variant="outlined"
					helperText={errors.title}
					error={!!errors.title}
					fullWidth
					required
				/>
				<ButtonIcon tip="Remover Resposta" onClick={() => console.log('haha')}>
					<RemoveIcon color="primary" />
				</ButtonIcon>
			</div>
		</div>
	);
}

export default withStyles(styles)(Test);
