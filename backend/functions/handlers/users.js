const { db, admin } = require('../util/admin');

const config = require('../keys/firebaseConfig');
const firebase = require('firebase');
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require('../util/validation');

const signUpSupervisor = (newUser, res) => {
	let token, userId;

	db
		.doc(`/users/${userId}`)
		.get()
		.then(() => {
			return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((userToken) => {
			token = userToken;

			const userCredentials = {
				userId,
				name: newUser.name,
				email: newUser.email,
				admin: true,
				createdAt: new Date().toISOString(),
			};

			db.doc(`/users/${userId}`).set(userCredentials);
		})
		.then(() => {
			admin.auth().getUserByEmail(newUser.email).then((user) => {
				return admin.auth().setCustomUserClaims(user.uid, {
					admin: true,
				});
			});
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((error) => {
			console.error(error);

			if (error.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'E-mail já cadastrado' });
			}
			else {
				return res.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
};

const signUpStudent = (newUser, res) => {
	let token, userId;

	db
		.doc(`/users/${userId}`)
		.get()
		.then(() => {
			return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((userToken) => {
			token = userToken;

			const userCredentials = {
				userId,
				name: newUser.name,
				email: newUser.email,
				admin: false,
				createdAt: new Date().toISOString(),
			};

			db.doc(`/users/${userId}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({ token });
		})
		.catch((error) => {
			console.error(error);

			if (error.code === 'auth/email-already-in-use') {
				return res.status(400).json({ email: 'E-mail já cadastrado' });
			}
			else {
				return res.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
};

exports.signup = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		userType: req.body.userType,
		code: req.body.code,
	};

	const { valid, errors } = validateSignupData(newUser);

	if (!valid) {
		return res.status(400).json(errors);
	}
	else {
		if (newUser.userType === 'supervisor') {
			// static value for now
			if (newUser.code === '4862') {
				return signUpSupervisor(newUser, res);
			}
			else {
				return res.status(400).json({ code: 'Código inválido' });
			}
		}
		else if (newUser.userType === 'student') {
			return signUpStudent(newUser, res);
		}
		else {
			return res.status(400).json({ userType: 'Tipo de usuário inválido' });
		}
	}
};

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	const { valid, errors } = validateLoginData(user);

	if (!valid) {
		return res.status(400).json(errors);
	}

	if (Object.keys(errors).length > 0) return res.status(400).json(errors);

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token });
		})
		.catch((error) => {
			console.error(error);

			return res.status(403).json({ general: 'Dados incorretos. Por favor, tente de novo' });
		});
};

exports.getAuthenticatedUser = (req, res) => {
	let userData = {};
	db
		.doc(`/users/${req.user.user_id}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userData.credentials = doc.data();
			}

			return res.json(userData);
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ error: err.code });
		});
};
