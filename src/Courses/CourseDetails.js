import React from 'react';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import Image from '../shared/components/SVG/PressPlay';
import courseImage from '../shared/assets/thumb2.jpg';

const styles = (theme) => ({
	...theme.properties,
	paper: {
		padding: '2.2rem',
	},
	title: {
		margin: '2rem 0 1.5rem',
	},
	btnLarge: {
		marginTop: '1rem',
		padding: '.7rem',
		width: '100%',
	},
	group: {
		margin: '2rem 0',
	},
	thumbnail: {
		margin: '0 auto',
		width: '100%',
		maxHeight: '320px',
		objectFit: 'cover',
	},
});

function CourseDetails(props) {
	const { classes } = props;

	return (
		<main className={classes.main}>
			<Grid container spacing={10}>
				<Grid item sm={8}>
					<Paper className={classes.paper}>
						<img src={courseImage} alt="thumbnail" className={classes.thumbnail} />
						<div className={classes.title}>
							<Typography variant="h4" component="h3" gutterBottom>
								Um titulo super interessante interessante
							</Typography>
							<Typography variant="body1" color="textSecondary">
								<strong>Categoria: </strong>
								<Link to="/" className={classes.link}>
									Front-end development
								</Link>
							</Typography>
						</div>
						<Typography variant="body1" component="p" gutterBottom>
							Mussum Ipsum, cacilds vidis litro abertis. Delegadis gente finis, bibendum egestas augue arcu ut est.
							Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Quem num gosta di mim que vai
							caçá sua turmis! Leite de capivaris, leite de mula manquis sem cabeça. Não sou faixa preta cumpadi, sou
							preto inteiris, inteiris. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet
							nisi. Interagi no mé, cursus quis, vehicula ac nisi. Aenean aliquam molestie leo, vitae iaculis nisl. Mais
							vale um bebadis conhecidiss, que um alcoolatra anonimis. Suco de cevadiss deixa as pessoas mais
							interessantis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Si u
							mundo tá muito paradis? Toma um mé que o mundo vai girarzis!
						</Typography>
					</Paper>
				</Grid>
				<Grid item sm={4}>
					<Paper className={classes.paper}>
						<Image height="200px" width="400px" />
						<Button
							color="secondary"
							variant="contained"
							className={classes.btnLarge}
							onClick={() => console.log('matricular')}
						>
							Matricular
						</Button>
						<div className={classes.group}>
							<Typography variant="body1" color="primary" component="p">
								Professor(a)
							</Typography>
							<Typography variant="h4" color="textSecondary" component="p">
								John Doe
							</Typography>
						</div>
						<div className={classes.group} style={{ marginBottom: 0 }}>
							<Typography variant="body1" color="primary" component="p">
								Avaliações
							</Typography>
							<Rating name="read-only" value={4} precision={0.5} size="large" readOnly />
						</div>
					</Paper>
				</Grid>
			</Grid>
		</main>
	);
}

export default withStyles(styles)(CourseDetails);
