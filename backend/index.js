//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var morgan = require('morgan');

var app = express();

//configurations
var config = require('./config');

//User routes
const user = require('./routes/user');
const admin = require('./routes/admin');
const faculty = require('./routes/faculty');
const feedback = require('./routes/feedback');
const course = require('./routes/course');

//connect to MongoDB
mongoose.connect(config.database);
// on successful connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Feedback MongoDB @ 27017');
});
//on connection error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in DB connection: ' + err);
    }
});

//port no;
const port = process.env.PORT || 3000;

//adding middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/api', user);
app.use('/api', admin);
app.use('/api', faculty);
app.use('/api', feedback);
app.use('/api', course);

app.listen(port, () => {
    console.log("Server running at port: " + port);
});