const { db } = require('../util/admin');

exports.getAllVideosByModule = (req, res) => {
	db
		.collection('videos')
		.where('moduleId', '==', req.params.moduleId)
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

			return res.json(videos);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getVideo = (req, res) => {
	let video = {};

	db
		.doc(`/videos/${req.params.videoId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				video = doc.data();
			}

			return res.json(video);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addVideo = (req, res) => {
	if (req.body.title.trim() === '') {
		return res.status(400).json({ title: 'Campo não pode ser vazio' });
	}

	if (req.body.link.trim() === '') {
		return res.status(400).json({ link: 'Campo não pode ser vazio' });
	}

	let newVideo = {};

	db
		.doc(`/modules/${req.params.moduleId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				res.status(404).json({ error: 'Módulo não encontrado' });
			}
			else {
				newVideo = {
					title: req.body.title,
					link: req.body.link,
					moduleId: req.params.moduleId,
					createdAt: new Date().toISOString(),
					createdBy: req.user.user_id,
				};

				return db.collection('videos').add(newVideo);
			}
		})
		.then((doc) => {
			const resVideo = newVideo;
			resVideo.id = doc.id;

			res.json(resVideo);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.deleteVideo = (req, res) => {
	const document = db.doc(`/videos/${req.params.videoId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Vídeo não encontrado' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Vídeo deletado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
