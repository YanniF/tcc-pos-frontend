const functions = require('firebase-functions');
const fbAuth = require('./util/fbAuth');
const app = require('express')();
const { db } = require('./util/admin');

const cors = require('cors');
app.use(cors());

const { signup, login, getAuthenticatedUser } = require('./handlers/users');
const { getAllCoursesByUser, getCourse, addCourse, editCourse, deleteCourse } = require('./handlers/courses');
const { getAllModulesByCourse, getModule, addModule, editModule, deleteModule } = require('./handlers/modules');
const { getAllVideosByModule, getVideo, addVideo, deleteVideo } = require('./handlers/videos');
const { getAllDocumentsByModule, getDocument, addDocument, deleteDocument } = require('./handlers/documents');
const { getAllRatingsByCourse, getRating, addRating, editRating, deleteRating } = require('./handlers/ratings');
const { getAllTestsByModule, getTest, addTest, editTest, deleteTest } = require('./handlers/tests');

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', fbAuth, getAuthenticatedUser);

// Courses routes
app.get('/admin/courses', fbAuth, getAllCoursesByUser);
app.get('/admin/courses/:courseId', fbAuth, getCourse);
app.post('/admin/courses', fbAuth, addCourse);
app.put('/admin/courses/:courseId', fbAuth, editCourse);
app.delete('/admin/courses/:courseId', fbAuth, deleteCourse);

// Module routes
app.get('/admin/courses/:courseId/modules', fbAuth, getAllModulesByCourse);
app.get('/admin/courses/:courseId/modules/:moduleId', fbAuth, getModule);
app.post('/admin/courses/:courseId/modules', fbAuth, addModule);
app.put('/admin/courses/:courseId/modules/:moduleId', fbAuth, editModule);
app.delete('/admin/courses/:courseId/modules/:moduleId', fbAuth, deleteModule);

// Video routes
app.get('/admin/courses/:courseId/modules/:moduleId/videos', fbAuth, getAllVideosByModule);
app.get('/admin/courses/:courseId/modules/:moduleId/videos/:videoId', fbAuth, getVideo);
app.post('/admin/courses/:courseId/modules/:moduleId/videos', fbAuth, addVideo);
app.delete('/admin/courses/:courseId/modules/:moduleId/videos/:videoId', fbAuth, deleteVideo);

// Document routes
app.get('/admin/courses/:courseId/modules/:moduleId/documents', fbAuth, getAllDocumentsByModule);
app.get('/admin/courses/:courseId/modules/:moduleId/documents/:documentId', fbAuth, getDocument);
app.post('/admin/courses/:courseId/modules/:moduleId/documents', fbAuth, addDocument);
app.delete('/admin/courses/:courseId/modules/:moduleId/documents/:documentId', fbAuth, deleteDocument);

// Tests routes
app.get('/admin/courses/:courseId/modules/:moduleId/tests', fbAuth, getAllTestsByModule);
app.post('/admin/courses/:courseId/modules/:moduleId/tests', fbAuth, addTest);
app.get('/admin/courses/:courseId/modules/:moduleId/tests/:testId', fbAuth, getTest);
app.put('/admin/courses/:courseId/modules/:moduleId/tests/:testId', fbAuth, editTest);
app.delete('/admin/courses/:courseId/modules/:moduleId/tests/:testId', fbAuth, deleteTest);

// Rating routes
app.get('/courses/:courseId/ratings', fbAuth, getAllRatingsByCourse);
app.get('/courses/:courseId/ratings/:ratingId', fbAuth, getRating);
app.post('/courses/:courseId/ratings', fbAuth, addRating);
app.put('/courses/:courseId/ratings/:ratingId', fbAuth, editRating);
app.delete('/courses/:courseId/ratings/:ratingId', fbAuth, deleteRating);

// Report

// Enroll student

// Get Certificate

// Notifications

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
