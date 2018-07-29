// call the packages we need
const express = require('express');        // call express
const app = express();                 // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = http.createServer(app);
const io = require('socket.io').listen(server);
const cors = require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//mongoose.createConnection( 'mongodb://localhost/yarderstore' );
mongoose.connect('mongodb://localhost:27017/yarderstore');
var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = require('./router');            // get an instance of the express Router
var numOusers = 0;
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
//
// io.sockets.on('connection', function (socket) {
//     console.log('Socket connected');
//     // Socket event for gist created
//     socket.on('gistSaved', function (gistSaved) {
//         io.emit('gistSaved', gistSaved);
//     });
//
//     // Socket event for gist updated
//     socket.on('gistUpdated', function (gistUpdated) {
//         io.emit('gistUpdated', gistUpdated);
//     });
// });
io.on('connection', function (socket) {


    socket.on('userLoggedin', function () {
        numOusers++;
        console.log('numOusers ' + numOusers);
        io.emit('userLoggedin', numOusers);
    });

});
mongoose.Promise = global.Promise;


// mongoose.createConnection('mongodb://localhost:27017/yarderstore');
// mongoose.connection.once('open', ()=>{
//     console.log('\nConnected to DB successfully!\n');
//     app.listen(port, ()=>{
//         console.log('Server listen on port 3000\n\n');
//     });
// }).on('error', (err)=>{
//     console.log('DB Connection Error: ', err.message);
//     process.exit(1);
// });

// START THE SERVER
// =============================================================================
//app.listen(port);
// console.log('Magic happens on port ' + port);\
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// we wait till mongo is ready before letting the http handler query users:
db.once('open', function () {
    console.log('Running');


});
server.listen(port, () => {
    console.log('Server listen on port 3000\n\n');
});