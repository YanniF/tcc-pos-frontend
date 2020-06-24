const { db } = require('../../util/admin');

const { validateCourseData } = require('../../util/validation');

exports.getAllCoursesByUser = (req, res) => {
	db
		.collection('courses')
		.where('createdBy', '==', req.user.user_id)
		.get()
		.then((data) => {
			let courses = [];

			data.forEach((doc) => {
				courses.push({
					id: doc.id,
					title: doc.data().title,
					teacher: doc.data().teacher,
					category: doc.data().category,
					description: doc.data().description,
					thumbnail: doc.data().thumbnail,
					enrolledCount: doc.data().enrolledCount,
					finishedCount: doc.data().finishedCount,
					rating: doc.data().rating,
					numberOfRatings: doc.data().numberOfRatings,
				});
			});

			return res.json(courses);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Erro ao buscar todos os cursos' });
			console.error(error);
		});
};

// TODO: move method to a more generic file
exports.getCourse = (req, res) => {
	let course = {};
	let modulesIds = [];

	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				course = doc.data();
				course.id = doc.id;

				return db.collection('modules').where('courseId', '==', req.params.courseId).orderBy('title', 'asc').get();
			}
		})
		.then((data) => {
			let modules = [];

			data.forEach((doc) => {
				modules.push({
					id: doc.id,
					title: doc.data().title,
				});
			});

			course.modules = modules;
			if (modules.length > 0) {
				modulesIds = modules.map((module) => module.id);

				db
					.collection('videos')
					.where('moduleId', 'in', modulesIds)
					.orderBy('title', 'asc')
					.get()
					.then((data) => {
						let videos = [];

						data.forEach((doc) => {
							videos.push({
								id: doc.id,
								moduleId: doc.data().moduleId,
								title: doc.data().title,
								link: doc.data().link,
							});
						});

						course.videos = videos;

						return db.collection('documents').where('moduleId', 'in', modulesIds).orderBy('title', 'asc').get();
					})
					.then((data) => {
						let documents = [];

						data.forEach((doc) => {
							documents.push({
								id: doc.id,
								moduleId: doc.data().moduleId,
								title: doc.data().title,
								documentUrl: doc.data().documentUrl,
							});
						});

						course.documents = documents;

						return db.collection('tests').where('moduleId', 'in', modulesIds).orderBy('title', 'asc').get();
					})
					.then((data) => {
						let tests = [];

						data.forEach((doc) => {
							tests.push({
								id: doc.id,
								moduleId: doc.data().moduleId,
								title: doc.data().title,
								questions: doc.data().questions,
							});
						});

						course.tests = tests;

						return res.json(course);
					});
			}
			else {
				course.videos = [];
				course.documents = [];
				course.tests = [];

				return res.json(course);
			}
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
	};

	const { valid, errors } = validateCourseData(course);

	if (!valid || Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	// destructuring?
	const newCourse = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		createdBy: req.user.user_id,
		createdAt: new Date().toISOString(),
		enrolledCount: 0,
		finishedCount: 0,
		rating: 0,
		numberOfRatings: 0,
	};

	db
		.collection('courses')
		.add(newCourse)
		.then((doc) => {
			const resCourse = newCourse;
			resCourse.id = doc.id;

			res.json(resCourse);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Não foi possível cadastrar o curso.' });
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
			return res.status(500).json({ error: 'Não foi possível editar o curso.' });
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
			res.json({ message: 'Curso apagado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: 'Não foi possível apagar o curso.' });
		});
};
