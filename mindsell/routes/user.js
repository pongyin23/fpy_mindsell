var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

var user_model = require('../models/user_model');
var notification_model = require('../models/notification_model');

router.get('/setting', function(req, res, next) {
	res.render('setting', {
		user : (req.user ? req.user : null),
		msg: (req.query.message ? req.query.message : null)
	});
});

router.get('/user_profile', function(req, res, next) {
	var username = req.query.username;
	console.log("user is ",username);
	user_model.getUserProfile(username, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			// console.log("user profile:",user);
			if (typeof(data) == "undefined"){
				res.send(data);
			}else{
				var user = data;

				user_model.getRating(user.userId,function(err, filename, result) {

					if(err) {
						console.log(filename + ": " + err);
					} else {
						var rating = [0,0,0,0,0,0];
						// console.log("***********",result);
						try{
							if (result.Professional == null){
								rating = [5,5,5,5,5,5];
							} else{
								rating = [result.Professional,result.Creative,result.Useful,result.Interesting,result.Detailed,result.Clear];
							}
						}
						catch(err){
							rating = [5,5,5,5,5,5];
						}
						user.rating = rating;

						// console.log("user profile1:",user);

						notification_model.countNewMessage(user.userId,function(err, filename, data){
							user.messageNumber = data;
							// console.log("user profile now:",user);
							res.send(user);
						});
					}
				});
			}
		}
	});
});

router.post('/update_profile', jsonParser, function(req, res, next) {
	var userDetails = req.body;
	console.log(userDetails);
	user_model.updateUserProfile(userDetails.username, userDetails.nickname, userDetails.email, userDetails.contact, userDetails.gender, userDetails.introduction, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			console.log("----------the router is POST");
			res.redirect('/profile');
		}
	});
});

router.post('/change_password', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var newPassword = req.body.newPassword;
	var confirmPassword = reql.body.confirmPassword;

	user_model.getUserProfile(username, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			if(data.password == password) {

			} else {

			}
		}
	});

	res.render('/login');
});

module.exports = router;