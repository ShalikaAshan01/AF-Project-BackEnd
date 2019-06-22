const StudentCourse = require('../models/StudentCourse');
const mongoose = require('mongoose');


exports.enrollToCourse = (req, res) => {

    const studentCourse = new StudentCourse({
        _id: new mongoose.Types.ObjectId(),
        studentId: req.body.studentId,
        courseId: req.body.courseId,
        courseName: req.body.courseName
    });
    studentCourse
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Course assigned',
                studentCourse: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


exports.unEnrollFromCourse = function (req, res) {
    var query = {
        _id: req.params.id
    };
    StudentCourse.remove(query, function (err, studentCourse) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            studentCourse
        });
    });
};

exports.getAllCourse = function (req, res) {
    var query = {
        studentId: req.params.id
    };

    StudentCourse.find(query, function (err, studentCourse) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            studentCourse
        });
    });
}