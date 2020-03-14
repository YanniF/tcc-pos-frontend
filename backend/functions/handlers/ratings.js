const { db } = require('../util/admin');

exports.getAllRatingsByCourse = (req, res) => {
	db
		.collection('ratings')
		.where('courseId', '==', req.params.courseId)
		.get()
		.then((data) => {
			let ratings = [];

			data.forEach((doc) => {
				ratings.push({
					id: doc.id,
					rating: doc.data().rating,
					comment: doc.data().comment,
					createdBy: doc.data().createdBy,
					cursoId: doc.data().cursoId,
				});
			});

			return res.json(ratings);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getRating = (req, res) => {
	let rating = {};

	db
		.doc(`/ratings/${req.params.ratingId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				rating = doc.data();
			}

			return res.json(rating);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addRating = (req, res) => {
	// TODO - verificar se o aluno terminou o curso
	let newRating = {};

	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: 'Curso não encontrado' });
			}
			else {
				newRating = {
					rating: req.body.rating,
					comment: req.body.comment,
					courseId: req.params.courseId,
					createdAt: new Date().toISOString(),
					createdBy: req.user.user_id,
				};

				return db.collection('ratings').add(newRating);
			}
		})
		.then((doc) => {
			const resRating = newRating;
			resRating.id = doc.id;

			res.json(resRating);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.editRating = (req, res) => {
	const rating = {
		rating: req.body.rating,
		comment: req.body.comment,
	};

	db
		.doc(`/ratings/${req.params.ratingId}`)
		.get()
		.then((doc) => {
			if (doc.exists && doc.data().createdBy === req.user.user_id) {
				return db.doc(`/ratings/${req.params.ratingId}`).update(rating);
			}
		})
		.then(() => {
			return res.json({ message: 'Avaliação alterada com sucesso' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.deleteRating = (req, res) => {
	const document = db.doc(`/ratings/${req.params.ratingId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Avaliação não encontrada' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Avaliação deletada com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
