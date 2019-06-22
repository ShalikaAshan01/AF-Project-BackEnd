const express = require('express');
const router = express.Router();

// UserController import
const AssignmentController = require('../controllers/AssignmentController');

router.get(('/instructor/:insId'), (req, res ) => {
    AssignmentController.getAssignmentByIns(req,res);
});

router.get(('/'), (req, res ) => {
    AssignmentController.getAll(req,res);
});

router.get(('/:id'), (req, res ) => {
    AssignmentController.getById( req, res);
});

router.get(('/course/:courseName'), (req, res ) => {
    console.log(req.params.id);
    AssignmentController.getbyCourse(req,res);
});

router.get(('/name/:assgnmentName'), (req, res ) => {
    AssignmentController.getbyAssgnmentName(req,res);
});

router.delete(('/:id'), (req, res ) => {
    AssignmentController.deleteById(req,res);
});

router.post(('/update/:id'), (req, res ) => {
    AssignmentController.updateAssignment(req,res);
});



module.exports = router;