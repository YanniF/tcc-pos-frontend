const { db } = require('../util/admin');

const { validateTestData } = require('../util/validation');

exports.getAllTestsByModule = (req, res) => {
	db
		.collection('tests')
		.where('moduleId', '==', req.params.moduleId)
		.get()
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

			return res.json(tests);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getTest = (req, res) => {
	let test = {};

	db
		.doc(`/tests/${req.params.testId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				test = doc.data();
			}

			return res.json(test);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addTest = (req, res) => {
	const test = {
		title: req.body.title,
		questions: req.body.questions,
	};

	const { valid, errors } = validateTestData(test);

	if (!valid || Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	let newTest = {};

	db
		.doc(`/modules/${req.params.moduleId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: 'Módulo não encontrado' });
			}
			else {
				newTest = {
					title: req.body.title,
					moduleId: req.params.moduleId,
					questions: req.body.questions,
					createdBy: req.user.user_id,
					createdAt: new Date().toISOString(),
				};

				return db.collection('tests').add(newTest);
			}
		})
		.then((doc) => {
			const resTest = newTest;
			resTest.id = doc.id;

			res.json(resTest);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.editTest = (req, res) => {
	const test = {
		title: req.body.title,
		questions: req.body.questions,
	};

	const { valid, errors } = validateTestData(test);

	if (!valid || Object.keys(errors).length > 0) {
		return res.status(400).json(errors);
	}

	db
		.doc(`/modules/${req.params.moduleId}`)
		.get()
		.then((doc) => {
			if (doc.exists && doc.data().createdBy === req.user.user_id) {
				return db.doc(`/tests/${req.params.testId}`).update(test);
			}
		})
		.then(() => {
			return res.json({ message: 'Teste alterado com sucesso' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.deleteTest = (req, res) => {
	const document = db.doc(`/tests/${req.params.testId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Teste não encontrado' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Teste deletado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
