var express = require('express');
var router = express.Router();
var path = require('path');

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

var user_model = require('../models/user_model');
var course_model = require('../models/course_model');
var notification_model = require('../models/notification_model');

router.get('/', function(req, res, next) {
	var tutorId = req.query.tutorId;
	console.log("tutor is" ,tutorId);
	var user = req.user;
	connection.query('SELECT * FROM  user where userId =  ?', [tutorId], function(err, result){
	    if (err){
	    	throw err;
	    } else{

	    	var tutorData = result[0];

	    	//----------get follower/following--------------//
			course_model.countFollowings(tutorId, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					// console.log(data);
					tutorData.followings=data;

					user_model.isStreaming(tutorId,function(err, filename, streamUrl) {
						if(err) {
							console.log(filename + ": " + err);
						} else {
							if (streamUrl == null){
								tutorData.isStreaming = null;
								console.log(streamUrl);
							}else{
								tutorData.isStreaming = streamUrl;
								console.log(streamUrl);
							}
							//----------get rating-------------//
							user_model.getRating(tutorId,function(err, filename, result) {
								if(err) {
									console.log(filename + ": " + err);
								} else {
									var rating = [0,0,0,0,0,0];
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
									console.log("*************rating:",rating);
									tutorData.rating = rating;

									course_model.countFollowers(tutorId, function(err, filename, data) {
										if(err) {
											console.log(filename + ": " + err);
										} else {
											// console.log(data);
											tutorData.followers=data;

											//----------check subscription-------------//

									    	if (typeof(user)=="undefined"){ // tackle no user login
												console.log("---no one login");
									    		tutorData.isFollowed = 0;
									    		res.render('tutor_profile', {
											    	user: (req.user ? req.user : null),
													message : req.flash('loginMessage'),
											    	tutor: tutorData
												});
												console.log("tutorData: tutor is",tutorData);
												console.log("tutorData: user is",req.user);
									    	}else{	

									    		// user logined and check whether subscribed the tutor
										    	connection.query('SELECT * FROM subscription where userId = ? and tutorId = ?',[user.userId,tutorId],function(err, result){
									    			if (err){
									    				// console.log("result: ",result)
											    		throw err;
											    	} else{
											    		console.log("result: ",result)
										    			if (result==""){
										    				// console.log('-----havent followed');
										    				tutorData.isFollowed = 0;
										    				res.render('tutor_profile', {
														    	user: (req.user ? req.user : null),
																message : req.flash('loginMessage'),
														    	tutor: tutorData
															});
										    			}else{
										    				console.log('---followed');
										    				tutorData.isFollowed = 1;
										    				res.render('tutor_profile', {
														    	user: (req.user ? req.user : null),
																message : req.flash('loginMessage'),
														    	tutor: tutorData
															});
															console.log("tutorData: tutor is",tutorData);
															console.log("tutorData: user is",req.user);
										    			}

									    			}
								    			});
									    		
									    	}
										}
									})

								}
							});
						}
					})
					

					
				}
			})
			


	    	
	    	//----------render tutor page-------------//

	    	

	    	// console.log("----user is:",req.user[0]);
	    }
	});
	// user_model.getUserProfile(tutorId, function(err, filename, data) {
	// 	if(err) {
	// 		console.log(filename + ": " + err);
	// 	} else {
	// 		res.send(data);
	// 	}
	// });
});

router.get('/subscribe',function(req,res,next){
	var userId = req.query.userId;
	var tutorId = req.query.tutorId;
	var nickname = req.query.nickname;

	connection.query('insert into subscription (userId, tutorId, subscriptionDate) VALUES ("' + userId + '", "' + tutorId + '", "' + new Date().toISOString().slice(0, 10) + '");', function (err, rows, fields) {
		if (err) {
			res.send(err);
			console.log("-------err:",err);
			console.log("!!!!!!!!fail at there");
		} else {
			connection.query('select MAX(subscriptionId) as subscriptionId from subscription;', function(err,rows, fields) {
				if(err) {
					res.send(false);
					console.log("--------!fail at there");
				} else {
					res.send(true);
					console.log("success!!!!!!");
					console.log("rows are",rows);
					console.log("fields are",fields);

					var message = nickname + " has followed you!";
					console.log( "Message is ", message);
					notification_model.addNewNotification(userId, tutorId , message , function(err, filename, boolean){
						if(err) {
							console.log(filename + ": " + err);
						} else {
							console.log('data: ' + boolean);
							// res.json(1);
						}
					})
				};
			});
		}
	});


});


router.get('/unfollow',function(req,res,next){
	var userId = req.query.userId;
	var tutorId = req.query.tutorId;
	var time = new Date();
	console.log("--------tutor is-----" ,userId,tutorId,time);

	connection.query('DELETE FROM subscription WHERE userId = ' + userId + ' AND tutorId = ' + tutorId + ';', function(err, rows, fields) {
		if(err) {
			console.log("fail");
			res.send(err);
		} else {
			console.log("-----------deleted");
			console.log("1. ",rows);
			console.log("2. ",fields);
			res.send(true);
		}	
	});	


});


module.exports = router;