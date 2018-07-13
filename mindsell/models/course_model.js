var mysql = require('mysql');
var path = require('path');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var filename = path.basename(__filename);

class Course {
	getAllCourses(callback) {
		connection.query('SELECT * FROM course;', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

	getCourseByKeyword(key, callback){
		connection.query('SELECT * FROM course WHERE description like ?  OR title like ? ',['%'+key+'%','%'+key+'%'], function(error, rows, fields) {
			if(error) {
				console.log("FAIL");
				callback(error, filename, null);
			} else {
				console.log("keyword has",rows);
				callback(null, filename, rows);
			}
		});	
	}

	getAllCoursesByPrice(min, max, callback) {
		connection.query('SELECT * FROM course WHERE price BETWEEN ' + min + ' AND ' + max + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});		
	}

	getAllCoursesByMaxPrice(max, callback) {
		connection.query('SELECT * FROM course WHERE price <= ' + max + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});	
	}

	getAllCoursesByMinPrice(min, callback) {
		connection.query('SELECT * FROM course WHERE price >= ' + min + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});	
	}

	getCoursesByCategory(category, callback) {
		connection.query('SELECT * FROM course WHERE categoryId IN (SELECT categoryId FROM category WHERE categoryName = "' + category + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

	getCoursesByCategoryAndPrice(category, min, max, callback) {
		connection.query('SELECT * FROM course WHERE price BETWEEN ' + min + ' AND ' + max + ' AND categoryId IN (SELECT categoryId FROM category WHERE categoryName = "' + category + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

	getCoursesByCategoryAndMaxPrice(category, max, callback) {
		connection.query('SELECT * FROM course WHERE price <= ' + max + ' AND categoryId IN (SELECT categoryId FROM category WHERE categoryName = "' + category + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

	getCoursesByCategoryAndMinPrice(category, min, callback) {
		connection.query('SELECT * FROM course WHERE price >= ' + min + ' AND categoryId IN (SELECT categoryId FROM category WHERE categoryName = "' + category + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

//This has bug
	getCoursesById(courseId, callback) {
		connection.query('SELECT * FROM course WHERE courseId = ' + courseId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
	}

	getStudentNumber(courseId, callback) {
		connection.query('SELECT COUNT(courseId) AS studentNumber, AVG(rating) As rating FROM enrollment WHERE courseId = ' + courseId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}			
		});
	}

	getCourseImage(courseId, callback) {
		connection.query('SELECT path FROM course_image WHERE courseId = ' + courseId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				if (typeof(rows[0])=="undefined"){
					console.log("the image is undefined");
					callback(null, filename, "");
				}else{
					console.log("the image data is",rows[0]);
					callback(null, filename, rows[0]);
				}
				
			}	
		});
	}

	getUserNameAndContactByCourse(courseId, callback) {
		connection.query('SELECT nickname, contact FROM user, course WHERE courseId = ' + courseId + ' AND course.userId = user.userId;', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				if (typeof(rows[0])=="undefined"){
					connection.query('SELECT username FROM user, course WHERE courseId = ' + courseId + ' AND course.userId = user.userId;', function(error, rows, fields) {
						if(error) {
							callback(error, filename, null);
						} else {
							if (typeof(rows[0])=="undefined"){
								console.log("the user does not exist anymore",rows[0]);
								callback(null, filename, rows[0]);
							}else{
								console.log("(no nickname)username is ",rows[0]);
								callback(null, filename, rows[0]);
							}
						}
					});	
				}else{
					console.log("nickname,contact is ",rows[0]);
					callback(null, filename, rows[0]);
				}
				
			}	
		});		
	}



	getUserCourseLike(userId, courseId, callback) {
		connection.query('SELECT liked FROM course_like WHERE courseId = ' + courseId + ' AND userId = ' + userId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				if (typeof(rows[0])=="undefined"){
					console.log("User never like");
					callback(null, filename, 0);
				}else{
					console.log("User liked before");
					callback(null, filename, 1);
				}
			}	
		});			
	}

	addUserCourseLike(userId, courseId, liked, callback) {
		connection.query('INSERT INTO course_like (userId, courseId, liked) VALUES (' + userId + ', ' + courseId + ', ' + liked + ');', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}	
		});			
	}

	deleteUserCourseLike(userId, courseId, liked, callback) {
		connection.query('DELETE FROM course_like WHERE userId = ' + userId + ' AND courseId = ' + courseId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}	
		});
	}

	addCourseEnrollment(userId, courseId, callback) {
		connection.query('INSERT INTO enrollment (userId, courseId, rating, enrollmentDate) VALUES (' + userId + ', ' + courseId  + ', ' + 5  + ', "' + new Date().toISOString().slice(0, 10) + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}	
		});			
	}

	getEnrollRecord(userId, courseId, callback) {
		connection.query('SELECT * FROM enrollment WHERE courseId = ' + courseId + ' AND userId = ' + userId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}	
		});
	}

	deleteCourseEnrollment(userId, courseId, callback) {
		connection.query('DELETE FROM enrollment WHERE userId = ' + userId + ' AND courseId = ' + courseId + ';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}	
		});			
	}

	addNewCourse(userId, title, description, categoryId, youtubeLink, price, image, location, callback) {
		connection.query('INSERT INTO course (userId, title, description, categoryId, youtubeLink, price, createDate, image, location) VALUES ("' + 
			userId + '", "' + title + '", "' + description + '", "' + categoryId + '", "' + youtubeLink + '", ' + price + ', "' + new Date().toISOString().slice(0, 10) + '", "' + image + '", "' + location + '");', function (err, rows, fields) {
			if (err) {
				callback(err, filename, null);
			} else {
				console.log( "----------add new course!!!");
				callback(null, filename, true);
			}
		});		
	}

	getComment(courseId, callback){

		connection.query('SELECT * FROM comment WHERE courseId = ' + courseId + ' ORDER BY createDate;', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				
				callback(null, filename, rows);

			}
		});
	}

	addComment(userId, nickname, photo, courseId, comment, callback){
		if (photo == null){
			photo = "";
		}
		connection.query('insert into comment (userId, nickname, photo, courseId, content, createDate) VALUES ("' + 
			userId + '", "' + nickname + '", "' + photo + '", "' + courseId + '", "' + comment + '", "' + new Date().toISOString().slice(0, 10) + '");',
			 function (err, rows, fields) {
			if (err) {
				callback(err, filename, null);
				console.log("-------err:",err);
			} else {
				connection.query('select MAX(commentId) as commentId from comment;', function(err,rows, fields) {
					if(err) {
						callback(null, filename, false);
					} else {
						callback(null, filename, true);
					};
				});
			}
		});
	}

	updateCategory(category, callback) {
		console.log("Query = " + 'UPDATE course SET categoryId = ' + category + ' WHERE categoryId = 21;');
		connection.query('UPDATE course SET categoryId = ' + category + ' WHERE categoryId = 21;', function(err, rows) {
			if(err) {
				callback(err, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
  	}

	countFollowings(tutorId, callback){
		connection.query('SELECT * FROM subscription where userId = ?',[tutorId],function(err, result){
			// console.log("result of following",result);
			var numOfFollowerings = result.length;
			callback(null, filename, numOfFollowerings);
		});
	}

	countFollowers(tutorId, callback){
		connection.query('SELECT * FROM subscription where tutorId = ?',[tutorId],function(err, result){
			// console.log("result of following",result);
			var numOfFollowers = result.length;
			callback(null, filename, numOfFollowers);
		});
	}

	updateRating(rating, tutorId, courseId, userId, callback){
		connection.query('SELECT ratingId FROM rating where courseId = ? AND userId = ?',[courseId, userId],function(err, result){
			if (err){
				callback(err, filename, null);
				console.log("-------err:",err);
			} else{
				if (typeof(result[0])=="undefined"){
					// console.log("------INSERT NEW DATA:");
					connection.query('INSERT INTO rating (courseId, tutorId, userId, Professional, Creative, Useful, Interesting, Detailed, Clear) VALUES (?,?,?,?,?,?,?,?,?)',
						[courseId, tutorId, userId, rating[0], rating[1], rating[2], rating[3], rating[4], rating[5]], function(err, result){
							if (err){
								callback(err, filename, null);
								console.log("-------err:",err);
							}else{
								// callback(null, filename, true);
							}
					})
					
				}else{
					connection.query('UPDATE rating SET Professional = ?, Creative = ?, Useful = ?, Interesting = ?, Detailed = ?, Clear = ? WHERE courseId = ? AND userId = ?',
						[rating[0], rating[1], rating[2], rating[3], rating[4], rating[5], courseId, userId], function(err, result){
							if (err){
								callback(err, filename, null);
								console.log("-------err:",err);
							}else{
								// callback(null, filename, true);
							}
					})
				}
				//count the total rating number
				connection.query('UPDATE course SET rating = (SELECT AVG(Professional + Creative + Useful + Interesting + Detailed + Clear)/6 FROM rating WHERE courseId = ?) WHERE courseId = ?',
					[courseId,courseId], function(err, rows){
					if (err){
						callback(err, filename, null);
						console.log("-------err:",err);
					}else{
						callback(null, filename, true);
					}
				})
				
				
			}
		});
	}

	getPersonalRating(courseId, userId, callback){
		connection.query('SELECT Professional , Creative, Useful, Interesting, Detailed, Clear From rating WHERE courseId = ? AND userId = ?',
			[courseId, userId], function(err, rows){
				if (err){
					callback(err, filename, null);
					console.log("-------err:",err);
				}else{
					if (typeof(rows[0])=="undefined"){
						callback(null, filename, null);
					}else{
						callback(null, filename, rows[0]);
					}
					
				}
			})
	}
} 

module.exports = new Course();