import React from 'react';

// import withStyles from '@material-ui/core/styles/withStyles';

import DisplayCourses from './DisplayCourses';
import classes from './Courses.module.scss';

function Courses() {
	return (			
		<main className={classes.courses}>
			<h1>Meus Cursos</h1>
			<DisplayCourses title="Em andamento" />
			<DisplayCourses title="Concluídos" />
		</main>
	);
}

export default Courses;
