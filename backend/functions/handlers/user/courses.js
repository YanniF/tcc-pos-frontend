const { db } = require('../../util/admin');

exports.getLatestCourses = (req, res) => {
	db
		.collection('courses')
		.orderBy('createdBy', 'desc')
		// .limit(9)
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
					rating: doc.data().rating,
					numberOfRatings: doc.data().numberOfRatings,
				});
			});

			return res.json(courses);
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: 'Erro ao buscar novos cursos' });
		});
};

exports.enrollInCourse = (req, res) => {
	let course = {};
	//  TODO: update course, enrolled++
	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: 'Curso não encontrado' });
			}
			else {
				course = {
					userId: req.user.user_id,
					courseId: req.params.courseId,
					hasFinishedCourse: false,
					finishedVideos: [],
					finishedTests: [],
					createdAt: new Date().toISOString(),
					createdBy: req.user.user_id,
				};

				return db.collection('studentCourse').add(course);
			}
		})
		.then((doc) => {
			const resCourse = course;
			resCourse.id = doc.id;

			res.json(resCourse);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: 'Não foi realizar a matrícula no curso.' });
		});
};

exports.getAllEnrolledCourses = (req, res) => {
	db
		.collection('studentCourse')
		.where('userId', '==', req.user.user_id)
		.get()
		.then((data) => {
			let courses = [];

			data.forEach((doc) => {
				courses.push({
					id: doc.data().id,
					courseId: doc.data().courseId,
					finishedVideos: doc.data().finishedVideos,
					finishedTests: doc.data().finishedTests,
					hasFinishedCourse: doc.data().hasFinishedCourse,
				});
			});

			return res.json(courses);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Erro ao buscar todos os cursos' });
			console.error(error);
		});
};
