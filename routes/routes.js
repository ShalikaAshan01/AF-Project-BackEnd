// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to LMS App Backend!',
    });
});

// Import controllers
var userController = require('./controller/userController');



//User routes
router.route('/user/signin').get(userController.signin); //add new user

//Assignment routes

//Course routes 


// Export API routes
module.exports = router;