const { db, admin } = require('../util/admin');
const config = require('../keys/firebaseConfig');

exports.getAllDocumentsByModule = (req, res) => {
	db
		.collection('documents')
		.where('moduleId', '==', req.params.moduleId)
		.get()
		.then((data) => {
			let documents = [];

			data.forEach((doc) => {
				documents.push({
					moduleId: doc.id,
					title: doc.data().title,
					documentUrl: doc.data().documentUrl,
				});
			});

			return res.json(documents);
		})
		.catch((error) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.error(error);
		});
};

exports.getDocument = (req, res) => {
	let documents = {};

	db
		.doc(`/documents/${req.params.documentId}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				documents = doc.data();
			}

			return res.json(documents);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addDocument = (req, res) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');

	const busboy = new BusBoy({ headers: req.headers });
	let documentFileName,
		documentToBeUploaded = {},
		documentUrl;

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		// TODO - verificar se tem restricao de formato dos arquivos
		/* if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
			return res.status(400).json({ error: 'Wrong file type submitted' });
		} */

		const documentExtension = filename.split('.').pop();
		documentFileName = Math.round(Math.random() * 10000000) + '.' + documentExtension;

		const filepath = path.join(os.tmpdir(), documentFileName);
		documentToBeUploaded = { filepath, mimetype };
		file.pipe(fs.createWriteStream(filepath));
	});

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket(config.storageBucket)
			.upload(documentToBeUploaded.filepath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: documentToBeUploaded.mimetype,
					},
				},
			})
			.then(() => {
				documentUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${documentFileName}?alt=media`;

				if (req.body.title.trim() === '') {
					return res.status(400).json({ title: 'Campo não pode ser vazio' });
				}

				let newDocument = {};

				db.doc(`/modules/${req.params.moduleId}`).get().then((doc) => {
					if (!doc.exists) {
						res.status(404).json({ error: 'Módulo não encontrado' });
					}
					else {
						newDocument = {
							title: req.body.title,
							documentUrl,
							moduleId: req.params.moduleId,
							createdAt: new Date().toISOString(),
							createdBy: req.user.user_id,
						};

						return db.collection('documents').add(newDocument);
					}
				});
			})
			.then((doc) => {
				const resDocument = newDocument;
				resDocument.id = doc.id;

				res.json(resDocument);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).json({ error: err.code });
			});
	});

	busboy.end(req.rawBody);
};

exports.deleteDocument = (req, res) => {
	const document = db.doc(`/documents/${req.params.documentId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return res.status(404).json({ error: 'Material complementar não encontrado' });
			}

			if (doc.data().createdBy !== req.user.user_id) {
				return res.status(403).json({ error: 'Não autorizado' });
			}
			else {
				return document.delete();
			}
		})
		.then(() => {
			res.json({ message: 'Material complementar deletado com sucesso' });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: error.code });
		});
};
