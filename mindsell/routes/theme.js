var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

const jsonParser = bodyParser.json();

var theme_model = require('../models/theme_model');

router.get('/', function(req, res, next) {
	res.render('theme', {
		user : (req.user ? req.user : null),
		msg: (req.query.message ? req.query.message : null)
	});
});

router.get('/createTheme', function(req, res, next) {
	res.render('theme_add', {
		user : (req.user ? req.user : null),
		msg: (req.query.message ? req.query.message : null)
	});
});

router.post('/upload', function(req, res, next) {
  // console.log(res);
  // create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '../public/img/theme');

	// every time a file has been uploaded successfully,
	// rename it to it's orignal name
	form.on('file', function(field, file) {
		fs.rename(file.path, path.join(form.uploadDir, file.name));
	});

	// log any errors that occur
	form.on('error', function(err) {
		console.log('An error has occured: \n' + err);
	});

	// once all the files have been uploaded, send a response to the client
	form.on('end', function() {
		res.end('success');
	});
	// parse the incoming request containing the form data
	form.parse(req);
});

router.post('/addTheme', function(req, res, next) {
	var themeDetails = req.body;
	console.log(themeDetails);
	theme_model.addTheme(themeDetails.title, themeDetails.introduction, themeDetails.history, themeDetails.background, themeDetails.themeImage1, themeDetails.themeImage2, themeDetails.themeImage3, themeDetails.content, themeDetails.hashtag, function(err, filename,data) {
		if(err) {
			console.log(filename + ": " + err);
			console.log("fail");
		} else {
			console.log("Data=" + data);
			res.send(data);
		}
	});
});

router.get('/getTheme', function(req, res, next) {
	theme_model.getCurrentTheme(function(err, filename,data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			console.log("Data=" + data);
			res.send(data);
		}
	}); 
});

module.exports = router;