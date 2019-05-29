// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./routes/routes");


// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
//mongoose.connect('mongodb://localhost/trainApp');
mongoose.connect('--------------------------------------', { useNewUrlParser: true });

var db = mongoose.connection;
console.log("DB status", db);
// Setup server port
var port = process.env.PORT || 8080;

//core headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Send message for default URL
app.get('/', (req, res) => res.send('Server run on 8080'));

// Use Api routes in the App
app.use('/lms', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running LMS on port " + port);
});