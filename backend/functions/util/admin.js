const admin = require('firebase-admin');
const credentials = require('../keys/admin.json');

admin.initializeApp({
	credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

module.exports = { admin, db };
