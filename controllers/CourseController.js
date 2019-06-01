/**
 * UserController
 * All user functions are defined here
 * Functions are called in '../routes/'
 */

const Course = require('../models/Course');

exports.filterFaculty = function (req, res) {
    var query = { 
        faculty: req.params.faculty
    };
    Course.find(query, function (err, courses) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            courses
        });
    });
};

exports.filterInstructor = function (req, res) {
    var query = { 
        instructor_id: req.params.instructor_id
    };
    Course.find(query, function (err, courses) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            courses
        });
    });
};

exports.filterInstructorStatus = function (req, res) {
    var query = { 
        instructor_id: req.params.instructor_id,
        status: req.params.status
    };
    Course.find(query, function (err, courses) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            courses
        });
    });
};

exports.filterFacultyStatus = function (req, res) {
    var query = { 
        faculty: req.params.faculty,
        status: req.params.status
    };
    Course.find(query, function (err, courses) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            courses
        });
    });
};

exports.changeStatus = function (req, res) {
    Course.findById(req.params.id, function (err, course) {
        if (err)
            res.send(err);
        course.status = req.body.status;
        course.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Status changed',
                data: course
            });
        });
    });
};