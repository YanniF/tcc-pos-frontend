const { db, admin } = require('../util/admin');

const { validateCourseData } = require('../util/validation');

exports.addCourse = (req, res) => {
	const course = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		// thumbnail: req.body.teacher,
	};

	const { valid, errors } = validateCourseData(course);

	if (!valid) {
		return res.status(400).json(errors);
	}

	if (Object.keys(errors).length > 0) return res.status(400).json(errors);

	const newCourse = {
		title: req.body.title,
		teacher: req.body.teacher,
		category: req.body.category,
		description: req.body.description,
		// thumbnail: req.user.thumbnail,
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
