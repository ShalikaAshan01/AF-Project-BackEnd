/**
 * All user related route requests are defined here
 * Export router and define it in app.js
 */

const express = require('express');
const router = express.Router();

// UserController import
const UserController = require('../controllers/UserController');

router.route('/register').post(UserController.register);
router.route('/login').post(UserController.login);
router.route('/verify/send/:userId').post(UserController.sendVerifyMail);

module.exports = router;
