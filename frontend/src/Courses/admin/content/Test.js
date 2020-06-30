import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import { TextField, Divider, FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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

		'@media screen and (max-width: 600px)': {
			flexDirection: 'column',
		}
	},
	bottomItems: {
		...theme.properties.inputSpacing,
		width: '30%',

		'@media screen and (max-width: 600px)': {
			width: '100%',
		}
	}
});

function Test(props) {
	const { classes, modules, values, onChange, errors, isEditing } = props;

	const addQuestion = () => {
		const questions = [ ...values.questions ];

		questions.push({
			question: '',
			options: [ { id: '', title: '' } ],
			points: '',
			answer: '',
		});

		onChange('questions', questions);
	};

	const removeQuestion = (index) => {
		const questions = [ ...values.questions ];
		questions.splice(index, 1);

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

	const handleOnChange = (name, value, indexQuestion, indexAnswer) => {
		const questions = [ ...values.questions ];

		if (indexAnswer || indexAnswer === 0) {
			questions[indexQuestion].options[indexAnswer] = {
				id: indexAnswer,
				title: value,
			};
		}
		else {
			questions[indexQuestion][name] = value;
		}

		onChange('questions', questions);
	};

	return (
		<div>
			{!isEditing && (
				<FormControl variant="outlined" fullWidth className={classes.inputSpacing}>
					<InputLabel id="module">Módulo</InputLabel>
					<Select
						labelId="module"
						id="module"
						name="moduleId"
						labelWidth={55}
						value={values.moduleId}
						onChange={(e) => onChange(e.target.name, e.target.value)}
					>
						{modules.map((module) => (
							<MenuItem key={module.id} value={module.id}>
								{module.title}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
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
							name="question"
							value={question.question}
							label="Pergunta"
							onChange={({ target }) => handleOnChange(target.name, target.value, index)}
							className={classes.inputSpacing}
							variant="outlined"
							fullWidth
							required
						/>
						<ButtonIcon tip="Remover Pergunta" onClick={() => removeQuestion(index)}>
							<DeleteIcon color="primary" />
						</ButtonIcon>
					</div>
					{question.options.map((answer, idx) => (
						<div className={classes.questionGroup} key={idx}>
							<span className={classes.answerNumber}>{numbersToLetters(idx + 1)}</span>
							<TextField
								name="title"
								value={answer.title}
								label="Resposta"
								onChange={({ target }) => handleOnChange(target.name, target.value, index, idx)}
								className={classes.inputSpacing}
								variant="outlined"
								fullWidth
								required
							/>
							<ButtonIcon tip="Remover Resposta" onClick={() => removeAnswer(index, idx)}>
								<DeleteIcon color="primary" />
							</ButtonIcon>
						</div>
					))}
					<div className={classes.bottomGroup}>
						<FormControl variant="outlined" className={classes.bottomItems}>
							<InputLabel id="answer">Resposta Correta</InputLabel>
							<Select
								labelId="answer"
								id="answer"
								name="answer"
								labelWidth={127}
								value={question.answer}
								onChange={(e) => handleOnChange(e.target.name, e.target.value, index)}
							>
								{Array.from({ length: question.options.length }, (item, i) => (
									<MenuItem key={i} value={i}>
										{numbersToLetters(i + 1)}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							name="points"
							type="number"
							value={question.points}
							label="Pontos"
							onChange={({ target }) => handleOnChange(target.name, target.value, index)}
							className={classes.bottomItems}
							variant="outlined"
							required
						/>
						<Button
							color="primary"
							variant="contained"
							className={classes.inputSpacing}
							onClick={() => addAnswer(index)}
						>
							Adicionar Resposta
						</Button>
					</div>
				</React.Fragment>
			))}
			<Button
				color="secondary"
				variant="contained"
				className={classes.btnLarge}
				style={{ margin: '20px 0 0 50px' }}
				onClick={addQuestion}
			>
				Adicionar Pergunta
			</Button>
		</div>
	);
}

export default withStyles(styles)(Test);
