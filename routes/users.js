/**
 * All user related route requests are defined here
 * Export router and define it in app.js
 */

const express = require('express');
const router = express.Router();

// UserController import
const UserController = require('../controllers/UserController');

// User common routes
router.route('/').get(UserController.index);
router.route('/register').post(UserController.register);
router.route('/login').post(UserController.login);
router.route('/id/:userId').get(UserController.getUserById);
router.route('/username/:username').get(UserController.getUserByUsername);
router.route('/:userId').put(UserController.updateUser);
router.route('/verify/send/:userId').get(UserController.sendVerifyMail);
router.route('/verify/:userId').post(UserController.verifyCode);

// Instructor routes
router.route('/instructor/:faculty').get(UserController.findInstructorByFaculty);


module.exports = router;
