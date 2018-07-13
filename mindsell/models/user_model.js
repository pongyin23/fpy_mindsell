var mysql = require('mysql');
var path = require('path');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var filename = path.basename(__filename);

class User {
	register(username, email, password, callback) {
		connection.query('INSERT INTO user (username, password, email) VALUES ("' + username + '", "' + password + '", "' + email + '");', function (error, rows, fields) {
			if (error) {
				callback(error, filename);
			} else {
				connection.query('SELECT MAX(userId) AS userId FROM user;', function(error,rows, fields) {
					if(error) {
						callback(error, filename);
					} else {
						connection.query('INSERT INTO rating (userId) VALUES ("' + rows[0].userId + '");', function(error, rows, fields) {
							if(error) {
								callback(error, filename);
							} else {
								callback(null, filename);
							}
						});
					}
				});
			}
		});
	}

	getUserProfile(username, callback) {
		connection.query('SELECT * FROM user WHERE username = "' + username + '";', function (error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
	}

	updateUserProfile(username, nickname, email, contact, gender, introduction, callback) {
		connection.query('UPDATE user SET nickname = "' + nickname + '", email = "' + email + '", contact = "' + contact + '", gender = "' + gender + '", introduction = "' + introduction + '" WHERE username = "' + username + '";', function(error,rows,fields) {
			if(error || rows.length < 1) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
	}

	changePassword(username, newPassword, callback) {
		connection.query('UPDATE user SET password ="' + newPassword + '" WHERE username = "' + username + '";', function (error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
	}

	getRating(userId,callback){
		connection.query('SELECT ratingId FROM rating where tutorId = ?',[16],function(err, result){
			if (err){
				callback(err, filename, null);
				console.log("-------err:",err);
			} else{
				if (typeof(result[0])=="undefined"){
					// console.log("-+-+-+-+- no one rate",result[0]);
					callback(null, filename, null);
				}else{
					connection.query('SELECT AVG(Professional) as Professional, AVG(Creative) as Creative ,AVG(Useful) as Useful, AVG(Interesting) as Interesting, AVG(Detailed) as Detailed, AVG(Clear)as Clear FROM rating WHERE tutorID = ?;', [userId], function(error,rows,fields){
						if (error){
							callback(error,filename,null);
						} else{
							// console.log("-+-+-+-+- has ratings",rows[0]);
							callback(null, filename, rows[0]);
						}
					})
				}
			}
		})
					
	}

	checkLivestream(path, callback){
		connection.query('SELECT * FROM livestream WHERE isEnded = 0 AND livestreamPath = ? ORDER BY livestreamId DESC LIMIT 1', path, function(err, result){
			if (err){
				callback(err, filename, null);
				console.log("-------err:",err);
			} else{
				if (typeof(result[0]) == "undefined"){
					console.log("------ no such data");
					callback(null, filename, null);
				}else{
					console.log("------ has such data",result[0]);
					connection.query('SELECT nickname FROM user WHERE userId = ?', result[0].userId, function(err, data){
						if (err){
							callback(err, filename, null);
							console.log("-------err:",err);
						} else{
							result[0].nickname = data[0].nickname;
							callback(null, filename, result[0]);
						}
					})
				}
			}
		})
	}

	updateLivestream(userId, title, description, livestreamPath, status, callback) {
		connection.query('INSERT INTO livestream (userId, title, description, livestreamPath, isEnded) VALUES ("' + userId + '", "' + title + '", "' + description + '", "' + livestreamPath + '", 0);', function(err, rows, fields) {
			if(err) {
				callback(err, filename, null);
			} else {
				callback(null, filename);
			}
		}); 
	}

	closeLivestream(livestreamId, isEnded, callback) {
		console.log("Closing the livestream");
		console.log("livestream: " + livestreamId);
		connection.query('UPDATE livestream SET isEnded = 1 WHERE livestreamId = "' + livestreamId + '";', function(err, rows, fields) {
			if(err) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows[0]);
			}
		});
	}

	isStreaming(tutorId, callback){
		console.log("check whether streaming");
		connection.query('SELECT livestreamPath AS path FROM livestream WHERE isEnded = 0 AND userId = ?',tutorId,function(err, rows, fields){
			if (err){
				callback(err, filename, null);
			}else {
				if (typeof(rows[0]) == "undefined"){
					console.log("------ no such data");
					callback(null, filename, null);
				}else{
					console.log("------ tutor is streaming at", tutorId,rows[0].path);
					callback(null, filename, rows[0].path);
				}
			}
		})
	}

	
}

module.exports = new User();