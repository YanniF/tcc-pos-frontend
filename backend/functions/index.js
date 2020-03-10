const functions = require('firebase-functions');
const fbAuth = require('./util/fbAuth');
const app = require('express')();
const { db } = require('./util/admin');

const cors = require('cors');
app.use(cors());

const { signup, login, getAuthenticatedUser } = require('./handlers/users');
const { addCourse } = require('./handlers/courses');

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', fbAuth, getAuthenticatedUser);

// Courses routes
app.post('/admin/course', fbAuth, addCourse);

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
