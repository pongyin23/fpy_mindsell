var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

/* GET home page. */
router.get('/', function(req, res, next) {
	
	connection.query("SELECT * FROM course ORDER BY createDate DESC", [], function(err, rows){
		if(err) {
			console.log(filename + ": " + err);
		} else {
			var recentCourses = rows;
			console.log("found Recent courses");
			connection.query("SELECT * FROM course ORDER BY popularity DESC", [], function(err, rows){
				if(err) {
					console.log(filename + ": " + err);
				} else {
					var popularCourses = rows
					console.log("found Popular courses");
					connection.query("SELECT * FROM course ORDER BY rating DESC", [], function(err, rows){
						if(err) {
							console.log(filename + ": " + err);
						} else {
							var ratingCourses = rows;
							console.log("found Rating courses");
							// console.log("-------1:" ,recentCourses);
							// console.log("-------2:" ,popularCourses);
							// console.log("-------3:" ,ratingCourses);
							res.render('index', { message: '',
								recentCourses: recentCourses,
								popularCourses: popularCourses,
								ratingCourses: ratingCourses,
								user : (req.user ? req.user : null),
								message : req.flash('loginMessage')
							});
						}
					});
				}
			});
		}
		
	});
});


module.exports = router;
