var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

var notification_model = require('../models/notification_model');

router.get('/', function(req, res, next) {
	res.render('notification', {
		user: (req.user ? req.user : {'username':null,'userId':null})
	});	
});

router.get('/display_notification', function(req, res, next) {
	var user = req.user;
	console.log('user: ' + user);
	notification_model.getAllNotification(user.userId, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			res.send(data);
		}
	});
});

router.get('/update_notification', function(req, res, next) {
	var user = req.user;
	notification_model.updateNotification(user.userId, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			
			res.send(data);
		}
	});
});

module.exports = router;