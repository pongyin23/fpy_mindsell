var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

var notification_model = require('../models/notification_model');
var user_model = require('../models/user_model');

router.get('/', function(req, res, next) {
	var path = req.query.livestream_path;
	console.log("~~~~~~~livestream details:",path);
	user_model.checkLivestream(path, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			if (data == null){
				console.log("The livestream is invalid",data);
				res.render('livestream', {
					user : (req.user ? req.user : null),
					stream: null
				});
			} else{
				console.log("The livestream is valid",data);
				res.render('livestream', {
					user : (req.user ? req.user : null),
					stream: data
				});
			}

		}
	});

});

router.post('/add_livestream', function(req, res, next) {
	var details = req.body;
	console.log("add livestream details:",details);
	var path = details.livestreamPath;
	// var linkId = path.split('https://youtu.be/')[1];
	// var streamUrl = "https://www.youtube.com/embed/"+linkId;
	var final_path = "http://localhost:3000/livestream?livestream_path=" + path;
	user_model.updateLivestream(details.userId, details.livestreamTitle, details.livestreamDescription, path, details.isEnded, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			console.log("Add livestream path successful!\n");
			notification_model.findReceiverBySubscription(details.userId,function(err, filename, user_list){
				if(err) {
					console.log(filename + ": " + err);
				} else {
					// console.log('--subscribed member data: ',user_list[0].userId);
						console.log("length",user_list.length);
						console.log("---------------");

					if (typeof(user_list) != null){
						var i;
						// console.log("length",user_list.length);
						for (i=0;i<user_list.length;i++){

							console.log( "Send message to subscribers");
							var message = details.nickname + " starts a live stream. Check out: "+ final_path;
							console.log( "Message is ", message);

							notification_model.addNewNotification(details.userId , user_list[i].userId , message , function(err, filename, boolean){
								if(err) {
									console.log(filename + ": " + err);
								} else {
									console.log('data: ' + boolean);
									// res.json(1);
								}
							})
						}

					}
					res.send(path);
				}
			})
			// res.redirect('/profile');
			// res.redirect('/livestream');
		}
	});
});

router.get('/update_livestream', function(req, res, next) {
	var details = req.query;
	console.log(details);

	user_model.closeLivestream(details.livestreamId, details.isEnded, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			console.log("Update livestream path successful!");
			res.redirect('/profile');
		}
	});
});

router.get('/check_streaming', function(req, res, next) {
	var userId = req.query.userId;
	console.log("------ID:",userId)
	user_model.isStreaming(userId, function(err, filename, streamUrl) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			if (streamUrl == null){
				res.send(null);
			}else{
				res.send(streamUrl);
			}
		}
	});
});

module.exports = router;