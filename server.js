// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
const cors=require('cors');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//mongoose.createConnection( 'mongodb://localhost/yarderstore' );
mongoose.connect('mongodb://localhost:27017/yarderstore');
var port = process.env.PORT || 3000;        // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = require('./router');            // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

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
app.listen(port, ()=>{
    console.log('Server listen on port 3000\n\n');
});