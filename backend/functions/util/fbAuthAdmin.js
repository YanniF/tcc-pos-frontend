const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
	let idToken;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	}
	else {
		console.error('Token não encontrado');
		return res.status(403).json({ error: 'Não autorizado' });
	}

	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			req.user = decodedToken;

			return db.collection('users').where('userId', '==', req.user.user_id).limit(1).get();
		})
		.then((data) => {
			if (req.user.admin) {
				req.user.name = data.docs[0].data().name;
				req.user.email = data.docs[0].data().email;
				req.user.admin = data.docs[0].data().admin;

				return next();
			}
			else {
				return res.status(401).json('Acesso negado');
			}
		})
		.catch((error) => {
			console.error('Erro na verificação do token', error);

			return res.status(403).json(error);
		});
};
