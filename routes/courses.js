/**
 * All user related route requests are defined here
 * Export router and define it in app.js
 */

const express = require('express');
const router = express.Router();

// UserController import
const CourseController = require('../controllers/CourseController');

router.route('/filterbyfaculty/:faculty').get(CourseController.filterFaculty);
router.route('/filterbyinstructor/:instructor_id').get(CourseController.filterInstructor);
router.route('/filterbyinstructorstatus/:instructor_id/:status').get(CourseController.filterInstructorStatus);
router.route('/filterbyfacultystatus/:faculty/:status').get(CourseController.filterFacultyStatus);
router.route('/changestatus/:id').put(CourseController.changeStatus);

module.exports = router;
