import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import { numbersToLetters } from '../../../shared/util/utility';
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
	questionNumber: {
		...coursesStyles.bubbleNumbers,
		backgroundColor: theme.palette.secondary.main,
		color: '#fff',
		opacity: 0.8,
	},
	answerNumber: {
		...coursesStyles.bubbleNumbers,
		color: theme.palette.primary.main,
		backgroundColor: 'rgba(0, 0, 0, 0.04)',
	},
	bottomGroup: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0 50px',
	},
});

function Test(props) {
	const { classes, modules, values, onChange, errors } = props;

	const addQuestion = () => {
		const questions = [ ...values.questions ];

		questions.push({
			question: '',
			options: [ { title: '' } ],
			points: 0,
			answer: null,
		});

		onChange('questions', questions);
	};

	const addAnswer = (index) => {
		const questions = [ ...values.questions ];
		questions[index].options.push({ title: '' });

		onChange('questions', questions);
	};

	const removeAnswer = (indexQuestion, indexAnswer) => {
		const questions = [ ...values.questions ];
		questions[indexQuestion].options.splice(indexAnswer, 1);

		onChange('questions', questions);
	};

	return (
		<div>
			<FormControl variant="outlined" fullWidth className={classes.inputSpacing}>
				<InputLabel id="module">Módulo</InputLabel>
				<Select
					labelId="module"
					id="module"
					name="module"
					labelWidth={55}
					value={values.module}
					onChange={(e) => onChange(e.target.name, e.target.value)}
				>
					{modules.map((module) => (
						<MenuItem key={module.id} value={module.id}>
							{module.title}
						</MenuItem>
					))}
				</Select>
			</FormControl>
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

			{values.questions.map((question, index) => (
				<React.Fragment key={index}>
					<Divider className={classes.divider} />
					<div className={classes.questionGroup}>
						<span className={classes.questionNumber}>{index + 1}</span>
						<TextField
							name="title"
							value={question.question}
							label="Pergunta"
							onChange={({ target }) => onChange(target.name, target.value)}
							className={classes.inputSpacing}
							variant="outlined"
							helperText={errors.question}
							error={!!errors.question}
							fullWidth
							required
						/>
						<ButtonIcon tip="Adicionar Resposta" onClick={() => addAnswer(index)}>
							<AddIcon color="primary" />
						</ButtonIcon>
					</div>
					{question.options.map((q, idx) => (
						<div className={classes.questionGroup} key={idx}>
							<span className={classes.answerNumber}>{numbersToLetters(idx + 1)}</span>
							<TextField
								name="title"
								value={values.title}
								label="Resposta"
								onChange={({ target }) => onChange(target.name, target.value)}
								className={classes.inputSpacing}
								variant="outlined"
								fullWidth
								required
							/>
							<ButtonIcon tip="Remover Resposta" onClick={() => removeAnswer(index, idx)}>
								<RemoveIcon color="primary" />
							</ButtonIcon>
						</div>
					))}
					<div className={classes.bottomGroup}>
						<FormControl variant="outlined" className={classes.inputSpacing} style={{ width: '45%' }}>
							<InputLabel id="module">Resposta Correta</InputLabel>
							<Select
								labelId="module"
								id="module"
								name="module"
								labelWidth={127}
								value={values.module}
								onChange={(e) => onChange(e.target.name, e.target.value)}
							>
								{Array.from({ length: question.options.length }, (item, i) => (
									<MenuItem key={i}>{numbersToLetters(i + 1)}</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							name="title"
							type="number"
							value={values.title}
							label="Pontos"
							onChange={({ target }) => onChange(target.name, target.value)}
							className={classes.inputSpacing}
							variant="outlined"
							helperText={errors.title}
							error={!!errors.title}
							style={{ width: '45%' }}
							required
						/>
					</div>
				</React.Fragment>
			))}
			<Button color="secondary" variant="contained" className={classes.btnLarge} onClick={addQuestion}>
				Adicionar Pergunta
			</Button>
		</div>
	);
}

export default withStyles(styles)(Test);
