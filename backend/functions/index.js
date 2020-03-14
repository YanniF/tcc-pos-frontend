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

// Users routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', fbAuth, getAuthenticatedUser);

// Courses routes
app.get('/admin/courses', fbAuth, getAllCoursesByUser);
app.post('/admin/courses', fbAuth, addCourse);
app.get('/admin/courses/:courseId', fbAuth, getCourse);
app.put('/admin/courses/:courseId', fbAuth, editCourse);
app.delete('/admin/courses/:courseId', fbAuth, deleteCourse);

// Module routes
app.get('/admin/courses/:courseId/modules', fbAuth, getAllModulesByCourse);
app.post('/admin/courses/:courseId/modules', fbAuth, addModule);
app.get('/admin/courses/:courseId/modules/:moduleId', fbAuth, getModule);
app.put('/admin/courses/:courseId/modules/:moduleId', fbAuth, editModule);
app.delete('/admin/courses/:courseId/modules/:moduleId', fbAuth, deleteModule);

// Video routes
app.get('/admin/courses/:courseId/modules/:moduleId/videos', fbAuth, getAllVideosByModule);
app.post('/admin/courses/:courseId/modules/:moduleId/videos', fbAuth, addVideo);
app.get('/admin/courses/:courseId/modules/:moduleId/videos/:videoId', fbAuth, getVideo);
app.delete('/admin/courses/:courseId/modules/:moduleId/videos/:videoId', fbAuth, deleteVideo);

// Document routes
// app.get('/admin/courses/modules', fbAuth, getAllModulesByCourse);
// app.post('/admin/courses/modules', fbAuth, addModule);
// app.get('/admin/courses/:courseId/modules/moduleId', fbAuth, getModule);
// app.delete('/admin/courses/:courseId/modules/moduleId', fbAuth, deleteModule);

// Tests routes
// app.get('/admin/courses/modules', fbAuth, getAllModulesByCourse);
// app.post('/admin/courses/modules', fbAuth, addModule);
// app.get('/admin/courses/:courseId/modules/moduleId', fbAuth, getModule);
// app.put('/admin/courses/:courseId/modules/moduleId', fbAuth, editModule);
// app.delete('/admin/courses/:courseId/modules/moduleId', fbAuth, deleteModule);

// Rating routes
// app.get('/admin/courses/modules', fbAuth, getAllModulesByCourse);
// app.post('/admin/courses/modules', fbAuth, addModule);
// app.get('/admin/courses/:courseId/modules/moduleId', fbAuth, getModule);
// app.put('/admin/courses/:courseId/modules/moduleId', fbAuth, editModule);
// app.delete('/admin/courses/:courseId/modules/moduleId', fbAuth, deleteModule);

// Report

// Enroll student

// Get Certificate

// Notifications

// https://baseurl.com/api/
exports.api = functions.region('europe-west1').https.onRequest(app);
