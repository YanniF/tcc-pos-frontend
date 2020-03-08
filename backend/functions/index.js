const functions = require('firebase-functions');
// const fbAuth = require('./util/fbAuth');
const app = require('express')();
const { db } = require('./util/admin');

const cors = require('cors');
app.use(cors());

const { signup, login } = require('./handlers/users');

// Users routes
app.post('/signup', signup);
app.post('/login', login);

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
