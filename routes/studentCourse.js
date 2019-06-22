/**
 * All user related route requests are defined here
 * Export router and define it in app.js
 */

const express = require('express');
const router = express.Router();

// UserController import
const StudentCourseController = require('../controllers/StudentCourseController');

// User common routes
router.route('/enroll').post(StudentCourseController.enrollToCourse);
router.route('/unenroll/:studentId/:courseId').delete(StudentCourseController.unEnrollFromCourse);


module.exports = router;
