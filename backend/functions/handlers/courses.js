const { db, admin } = require('../util/admin');

const { validateCourseData } = require('../util/validation');

exports.getAllCoursesByUser = (req, res) => {
	db
		.collection('courses')
		.where('createdBy', '==', req.user.user_id)
		.get()
		.then((data) => {
			let courses = [];

			data.forEach((doc) => {
				courses.push({
					courseId: doc.id,
					title: doc.data().title,
					teacher: doc.data().teacher,
					category: doc.data().category,
					description: doc.data().description,
					// thumbnail: doc.data().thumbnail,
					enrolledCount: doc.data().enrolledCount,
					finishedCount: doc.data().finishedCount,
				});
			});

			return res.json(courses);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getCourse = (req, res) => {
	let course = {};

	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				course = doc.data();
			}

			return res.json(course);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addCourse = (req, res) => {
	const course = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		// thumbnail: req.body.thumbnail,
	};

	const { valid, errors } = validateCourseData(course);

	if (!valid || Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	const newCourse = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		// thumbnail: req.body.thumbnail,
		createdBy: req.user.user_id,
		createdAt: new Date().toISOString(),
		enrolledCount: 0,
		finishedCount: 0,
	};

	db
		.collection('courses')
		.add(newCourse)
		.then((doc) => {
			const resCourse = newCourse;
			resCourse.courseId = doc.id;

			res.json(resCourse);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.editCourse = (req, res) => {
	const course = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		// thumbnail: req.body.teacher,
	};

	const { valid, errors } = validateCourseData(course);

	if (!valid || Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (doc.exists && doc.data().createdBy === req.user.user_id) {
				return db.doc(`/courses/${req.params.courseId}`).update(course);
			}
		})
		.then(() => {
			return res.json({ message: 'Curso alterado com sucesso' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.deleteCourse = (req, res) => {
	const document = db.doc(`/courses/${req.params.courseId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Curso não encontrado' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else if (doc.data().enrolledCount > 0) {
				return res.status(403).json({ error: 'Curso não pode ser apagado se ainda tiver alunos ativos' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Curso deletado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
