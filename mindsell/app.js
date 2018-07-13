var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var flash    = require('connect-flash');
var nodeadmin = require('nodeadmin')

var app = express();

var initPassport = require('./config/passport.js');
var passportRoutes = require('./app/passport_login.js');
var index = require('./routes/index');
var registration = require('./routes/registration');
var course = require('./routes/course');
var user = require('./routes/user');
var theme = require('./routes/theme');
var tutor_profile = require('./routes/tutor_profile');
var notification = require('./routes/notification');
var livestream = require('./routes/livestream');

// Configuration database
// var mysql = require('mysql');
// var dbconfig = require('./config/database');
// var connection = mysql.createConnection(dbconfig.connection);

// // Show connection message
// connection.connect(function(err) {
// 	if (err) {
// 		console.error('error connecting: ' + err.stack);
// 		return;
// 	}
// 	console.log('database connected: ' + connection.threadId);
// });
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(nodeadmin(app));

// Required for passport
app.use(session({
	secret: 'thisisacsfyp201718',
	resave: true,
	saveUninitialized: true
 } ));

// Configuring passport
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
app.use(flash());

initPassport(passport);
passportRoutes(app, passport);

app.use('/', index);
app.use('/registration', registration);
app.use('/course', course);
app.use('/user', user);
app.use('/theme', theme);
app.use('/tutor_profile',tutor_profile);
app.use('/notification', notification);
app.use('/livestream', livestream);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // r=Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
