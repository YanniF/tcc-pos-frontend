const { db } = require('../../util/admin');

exports.getLatestCourses = (req, res) => {
	db
		.collection('courses')
		.orderBy('createdBy', 'desc')
		.limit(9)
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
