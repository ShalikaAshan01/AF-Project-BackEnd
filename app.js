const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const morgan = require('morgan');

// DB connection
mongoose.connect('mongodb+srv://Lms:lms@af-lms-ikin0.mongodb.net/AF-LMS?retryWrites=true&w=majority', { useNewUrlParser: true });

/**
 * Route files are imported here
 */
const UserRoutes = require('./routes/users');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Handling CORS
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

/**
 * Define all routes here
 */
app.use('/user', UserRoutes);

/**
 * Sever configuration
 */
app.listen(3000, err => {
    if (err) {
        console.log('ERROR establishing server connection!');
        return;
    }

    console.log('Server running on http://localhost:3000');
});
