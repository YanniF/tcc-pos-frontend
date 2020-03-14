const { db } = require('../util/admin');

exports.getAllModulesByCourse = (req, res) => {
	db
		.collection('modules')
		.where('courseId', '==', req.params.courseId)
		.get()
		.then((data) => {
			let modules = [];

			data.forEach((doc) => {
				modules.push({
					moduleId: doc.id,
					title: doc.data().title,
				});
			});

			return res.json(modules);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getModule = (req, res) => {
	let module = {};

	db
		.doc(`/modules/${req.params.moduleId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				module = doc.data();
			}

			return res.json(module);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addModule = (req, res) => {
	if (req.body.title.trim() === '') {
		return res.status(400).json({ title: 'Campo não pode ser vazio' });
	}

	let newModule = {};

	db
		.doc(`/courses/${req.params.courseId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: 'Curso não encontrado' });
			}
			else {
				newModule = {
					title: req.body.title,
					courseId: req.params.courseId,
					createdAt: new Date().toISOString(),
					createdBy: req.user.user_id,
				};

				return db.collection('modules').add(newModule);
			}
		})
		.then((doc) => {
			const resModule = newModule;
			resModule.moduleId = doc.id;

			res.json(resModule);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.editModule = (req, res) => {
	if (req.body.title.trim() === '') {
		return res.status(400).json({ title: 'Campo não pode ser vazio' });
	}

	db
		.doc(`/modules/${req.params.moduleId}`)
		.get()
		.then((doc) => {
			if (doc.exists && doc.data().createdBy === req.user.user_id) {
				return db.doc(`/modules/${req.params.moduleId}`).update({ title: req.body.title });
			}
		})
		.then(() => {
			return res.json({ message: 'Módulo alterado com sucesso' });
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.deleteModule = (req, res) => {
	const document = db.doc(`/modules/${req.params.moduleId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Módulo não encontrado' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Módulo deletado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
