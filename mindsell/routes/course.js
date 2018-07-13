var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var course_model = require('../models/course_model');
var notification_model = require('../models/notification_model');
// var upload_image = require('../models/upload_image');

router.get('/course_list', function(req, res, next) {
	var course_category = (req.query.category) ? req.query.category : 'all';
	var min_price = (req.query.minprice) ? req.query.minprice : -1;
	var max_price = (req.query.maxprice) ? req.query.maxprice : -1;
	var keyword = (req.query.keyword) ? req.query.keyword : "";

	console.log('Category: ' + course_category);
	console.log('Min: ' + min_price);
	console.log('Max: ' + max_price);
	console.log('Keyword: ' + keyword);
	if (keyword != ""){
		console.log("----------searching the keyword!!!");
		course_model.getCourseByKeyword(keyword, function(err, filename, data) {
			if(err) {
				console.log("OOOOOPS!!!!");
				console.log(filename + ": " + err);
			} else {
				console.log("there is data entered");
				getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				console.log("------search :",data)
			}
		})
	};
	if(course_category == 'all') {
		if(min_price == -1 & max_price == -1) {
			course_model.getAllCourses(function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});
		} else if(min_price == -1 & max_price != -1) {
			course_model.getAllCoursesByMaxPrice(max_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});	
		} else if(min_price != -1 & max_price == -1) {
			course_model.getAllCoursesByMinPrice(min_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});	
		} else {
			course_model.getAllCoursesByPrice(min_price, max_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});			
		}
	} else {
		if(min_price == -1 & max_price == -1) {
			course_model.getCoursesByCategory(course_category, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});
		} else if(min_price == -1 & max_price != -1) {
			course_model.getCoursesByCategoryAndMaxPrice(course_category, max_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});	
		} else if(min_price != -1 & max_price == -1) {
			course_model.getCoursesByCategoryAndMinPrice(course_category, min_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});	
		} else {
			course_model.getCoursesByCategoryAndPrice(course_category, min_price, max_price, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					console.log("hi");
					getStudentCount(data, res, req);
					// res.render('course_list', {
					// 	data: data,
					// 	user : (req.user ? req.user : null),
					// });
				}
			});			
		}
	}
	// TODO: filter element
	// TODO: sorting element
});

function getStudentCount(courseList, res, req) {
	if (courseList != 0){
		courseList.forEach(function(obj, index, array) {
			course_model.getStudentNumber(obj.courseId, function(err,filename, stu) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					console.log("----------getStudentCount!!!");
					obj.studentNumber = stu.studentNumber ? stu.studentNumber : 0;

					if(index === array.length -1) {
						res.render('course_list', {
							data: courseList,
							user: (req.user ? req.user : {'username':null})
						});
					}
				}
			});
		});
	}else{
		res.render('course_list', {
			data: courseList,
			user: (req.user ? req.user : {'username':null})
		});
	}
	
}

router.get('/addCourse', function(req, res, next) {
	res.render('course_add', {
		user: (req.user ? req.user : {'username':null, 'userId':null}),
		course_category: ((req.query.category) ? req.query.category : 'all')
	});
});

router.post('/addCourse', function(req, res, next) {
	console.log("THINGS");
	var courseDetails = req.body;
	console.log(courseDetails);
	course_model.addNewCourse(courseDetails.userId, courseDetails.title, courseDetails.description, courseDetails.category, courseDetails.youtubeLink, courseDetails.price, courseDetails.courseImage, courseDetails.location, function(err, filename,data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			res.send(data);
		}
	});
});

router.post('/updateCategory', function(req, res, next) {
	var data = req.body;
	course_model.updateCategory(data.category, function(error, filename, data) {
		if(error) {
			console.log(filename + ": " + err);
		} else {
			res.send(data);
		}
	});
});


router.post('/upload', function(req, res, next) {
  // console.log(res);
  // create an incoming form object
	var form = new formidable.IncomingForm();

	// specify that we want to allow the user to upload multiple files in a single request
	form.multiples = true;

	// store all uploads in the /uploads directory
	form.uploadDir = path.join(__dirname, '../public/img/course');

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

router.get('/details', function(req, res, next) {
	var courseId = req.query.courseId;

	var user = req.user;
	console.log("user is ...",user);
	console.log("user is ...",courseId);

//------------get basic course information-------------------//

	course_model.getCoursesById(courseId, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {

			//------------get course student_numbers.-------------------//

			var courseDetails = data;
			// console.log("-----the data is ",data);

			var d = new Date(data.createDate);
			courseDetails.createDate =	d.toLocaleDateString();
			course_model.getStudentNumber(courseId, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					// console.log("-------second data is", data);

					//------------get course_Image-------------------//

					courseDetails.studentNumber = data.studentNumber;
					// courseDetails.fupd = data.rating;
					console.log("student number:",data.studentNumber);
					// console.log("rating",data.rating);

							//------------get course creater name-------------------//

							// courseDetails.image = data.path;							
							
							course_model.getUserNameAndContactByCourse(courseId, function(err, filename, data) {
								if(err) {
									console.log(filename + ": " + err);
								} else { 
									if (typeof(data) == "undefined"){ //user nickname does not exist
										courseDetails.tutorname = "N/A";
										courseDetails.tutorContact = "N/A";
										courseDetails.valid = 0;
									}else{ //username does exist
										courseDetails.tutorname = data.nickname; 
										courseDetails.tutorContact = data.contact;
										courseDetails.valid = 1;
									}
									// try{
									// 	courseDetails.tutorContact = data.contact;
									// }catch(error){
									// 	courseDetails.tutorContact = "";
									// }
									// console.log("nickname is",data.nickname);

									course_model.getComment(courseId, function(err, filename, data){
										if(err){
											throw err;
										}else{

											//------------get comments of the course-------------------//

											var commentDetails = data;
											console.log("comment details:", commentDetails);

											var selfRating = [5,5,5,5,5,5];

											//------------get course like-------------------//

											if (typeof(user)=="undefined"){ // tackle no user login
												console.log("no one login");
												courseDetails.liked = 0;
												courseDetails.logined = 0;
												courseDetails.enrolled = 0;
												courseDetails.selfRating = selfRating;
												console.log("courseDetails is",courseDetails);

												res.render('course_details', {
															data: courseDetails,
															comment: commentDetails,
															user : (req.user ? req.user : null),
														});
											}
											else {
												console.log("user logined"); //tackle user login
												courseDetails.logined = 1;
												course_model.getUserCourseLike(user.userId, courseId, function(err, filename, data) {
													if(err) {
														console.log(filename + ": " + err);
													} else {

														courseDetails.liked = data;
														console.log("courseDetails is",courseDetails);

														course_model.getEnrollRecord(user.userId, courseId, function(err, filename, data) {
															if(err) {
																console.log(filename + ": " + err);
															} else {
																if(data) {
																	courseDetails.enrolled = 1;
																} else {
																	courseDetails.enrolled = 0;
																}
																course_model.getPersonalRating(courseId,user.userId,function(err, filename, result){
																	if(err) {
																		console.log(filename + ": " + err);
																	} else {
																		
																		if (result != null){
																			selfRating[0]=result.Professional;
																			selfRating[1]=result.Creative;
																			selfRating[2]=result.Useful;
																			selfRating[3]=result.Interesting;
																			selfRating[4]=result.Detailed;
																			selfRating[5]=result.Clear;
																		}
																		courseDetails.selfRating = selfRating;
																		
																		// console.log("-----+++++ rating is",courseDetails.selfRating);
																		console.log('enrolled: ' + courseDetails.enrolled);
																		res.render('course_details', {
																			data: courseDetails,
																			comment: commentDetails,
																			user: (req.user ? req.user : null),
																		});
																	}
																})
															}
														});
													}
												});
											}
										}
									});
								}
							});
				}				
			});
		}		
	});
});

router.get('/update_like', function(req, res, next) {
	var isliked = req.query.isliked;
	var courseId = req.query.courseId;
	var user = req.user;
	var tutorId = req.query.tutorId;
	var courseTitle = req.query.courseTitle;
	console.log(courseTitle);
	if (typeof(user)!="undefined"){
		if (isliked==1){
			course_model.addUserCourseLike(user.userId, courseId, isliked, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					console.log('data: ' + data);
					console.log( "Now send a message to tutor");
					var message = user.nickname + " has liked your course " + courseTitle + ".";
					console.log( "Message is ", message);

					notification_model.addNewNotification(user.userId , tutorId , message , function(err, filename, boolean){
						if(err) {
							console.log(filename + ": " + err);
						} else {
							console.log('data: ' + boolean);
							// res.json(1);
							res.send(data);
						}
					})
					
				}
			});
		}else{
			course_model.deleteUserCourseLike(user.userId, courseId, isliked, function(err, filename, data) {
				if(err) {
					console.log(filename + ": " + err);
				} else {
					console.log('data: ' + data);
					res.send(data);
				}
			});
		}
	}else{
		console.log("no user login.");
	};
	
	

	
});

router.get('/enroll_course', function(req, res, next) {
	var isliked = req.query.isliked;
	var courseId = req.query.courseId;
	var tutorId = req.query.tutorId;
	console.log("tutorId is",tutorId);
	
	var courseTitle = req.query.courseTitle;
	var user = req.user;

	course_model.getEnrollRecord(user.userId, courseId, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			if(data) {
				course_model.deleteCourseEnrollment(user.userId, courseId, function(err, filename, data) {
					if(err) {
						console.log(filename + ": " + err);
					} else {
						console.log('data: ' + data);
						res.json(0);
					}
				});
			} else {
				course_model.addCourseEnrollment(user.userId, courseId, function(err, filename, data) {
					if(err) {
						console.log(filename + ": " + err);
					} else {
						console.log('data: ' + data);

						console.log( "Now send a message to tutor");
						var message = user.nickname + " has enrolled your course " + courseTitle + ".";
						console.log( "Message is ", message);

						notification_model.addNewNotification(user.userId , tutorId , message , function(err, filename, data){
							if(err) {
								console.log(filename + ": " + err);
							} else {
								console.log('data: ' + data);
								console.log( "Now send a message to tutor");
								var message = user.nickname + " leaves a comment about your course " + courseTitle + ".";
								console.log( "Message is ", message);

								notification_model.addNewNotification(user.userId , tutorId , message , function(err, filename, boolean){
									if(err) {
										console.log(filename + ": " + err);
									} else {
										console.log('data: ' + boolean);
										// res.json(1);
										res.send(data);
									}
								})
							}
						})
					}
				});
			}
		}		
	});
});

router.get('/update_comment', function(req, res, next) {
	var comment = req.query.comment;
	var courseId = req.query.courseId;
	var user = req.user;

	var tutorId = req.query.tutorId;
	var courseTitle = req.query.courseTitle;

	console.log("comment is",comment,courseId);
	if (typeof(user)!="undefined" && comment != ""){
		console.log("user logined.");
		if (user.photo == null){
			console.log("no photo");
		}else{
			console.log("has photo");
		}
		course_model.addComment(user.userId, user.nickname, user.photo, courseId, comment, function(err, filename, data) {
			if(err) {
				console.log(filename + ": " + err);
			} else {
				console.log('comment data: ' + data);
				res.send(data);
			}
		});
	}else{
		console.log("no user login or no comment");
	};
	

	
});


router.get('/update_rating', function(req,res,next){
	var rating = req.query.rating;
	var	tutorId = req.query.tutorId;
	var courseId = req.query.courseId;
	var userId = req.query.userId;

	// console.log("-----update rating!!!\n",rating,tutorId,courseId,userId);
	course_model.updateRating(rating, tutorId, courseId, userId, function(err, filename, data) {
		if(err) {
			console.log(filename + ": " + err);
		} else{
			console.log('update rating:' + data)
			res.send(data);
		}
	});
});

module.exports = router;
