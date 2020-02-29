import React from 'react';

import { Paper, Typography, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const CourseTest = () => {
	const questions = [
		{
			question: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor',
			options: [
				{
					id: 1,
					answer: 'Aenean aliquam molestie leo, vitae iaculis nisl',
				},
				{
					id: 2,
					answer: 'Em pé sem cair, deitado sem dormir',
				},
				{
					id: 3,
					answer: 'Sentado sem cochilar e fazendo pose. Não sou faixa preta cumpadi',
				},
				{
					id: 4,
					answer: 'Sou preto inteiris, inteiris. Detraxit consequat et quo num tendi',
				},
				{
					id: 5,
					answer: 'Nada',
				},
			],
			value: '1',
		},
		{
			question: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor',
			options: [
				{
					id: 6,
					answer: '1 Aenean aliquam molestie leo, vitae iaculis nisl',
				},
				{
					id: 7,
					answer: '2 Em pé sem cair, deitado sem dormir',
				},
				{
					id: 8,
					answer: '3 Sentado sem cochilar e fazendo pose. Não sou faixa preta cumpadi',
				},
				{
					id: 9,
					answer: '4 Sou preto inteiris, inteiris. Detraxit consequat et quo num tendi',
				},
				{
					id: 10,
					answer: '5 Nada',
				},
			],
			value: '2',
		},
		{
			question: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor',
			options: [
				{
					id: 11,
					answer: 'Aenean aliquam molestie leo, vitae iaculis nisl',
				},
				{
					id: 12,
					answer: 'Em pé sem cair, deitado sem dormir',
				},
				{
					id: 13,
					answer: 'Sentado sem cochilar e fazendo pose. Não sou faixa preta cumpadi',
				},
				{
					id: 14,
					answer: 'Sou preto inteiris, inteiris. Detraxit consequat et quo num tendi',
				},
				{
					id: 15,
					answer: 'Nada',
				},
			],
			value: '2',
		},
	];

	return questions.map((item) => (
		<Paper key={Math.random()}>
			<div>
				<Typography variant="h6" component="h5" gutterBottom>
					{item.question}
				</Typography>
				<span>0/{item.value}</span>
			</div>
			<FormControl fullWidth>
				<RadioGroup name="answer">
					{item.options.map((option) => (
						<FormControlLabel
							key={option.id}
							value={`answer-${option.id}`}
							control={<Radio color="primary" />}
							label={option.answer}
						/>
					))}
				</RadioGroup>
			</FormControl>
		</Paper>
	));
};

export default CourseTest;
