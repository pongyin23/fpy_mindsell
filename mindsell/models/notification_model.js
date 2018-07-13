var mysql = require('mysql');
var path = require('path');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var filename = path.basename(__filename);

class Notification {
	getAllNotification(receiverId, callback) {
		connection.query('SELECT * from notification WHERE receiver = ' + receiverId + ' ORDER BY notificationId DESC;', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});		
	}

	updateNotification(userId, callback){
		connection.query('UPDATE notification SET isRead = 1 WHERE isRead = ' + 0 + ' AND receiver = ' + userId +';', function(error, rows, fields) {
			if(error) {
				callback(error, filename, false);
			} else {
				callback(null, filename, true);
			}
		});
	}

	addNewNotification(senderId, receiverId, message, callback){

		connection.query('INSERT INTO notification (sender, receiver, message, createDate) VALUES ("' + 
			senderId + '", "' + receiverId  + '", "' + message  + '", "' + new Date().toISOString().slice(0, 10) +' ");',
			function(error, rows, fields){
			if(error) {
				callback(error, filename, false);
			} else {
				callback(null, filename, true);
			}
		});
	}

	countNewMessage(userId, callback){
		connection.query("SELECT COUNT(*) AS messageNumber FROM notification WHERE receiver = ? AND isRead = 0",[userId],function(error, rows){
			if(error) {
				callback(error, filename, false);
			} else {
				var messageNumber = rows[0].messageNumber;
				if (rows[0].messageNumber == null){
					messageNumber = 0;
					console.log("#of message",messageNumber);
				}
				callback(null, filename, messageNumber);
			}
		});
	}

	findReceiverBySubscription(tutorId, callback){
		connection.query("SELECT userId FROM subscription WHERE tutorId = ?",tutorId,function(error, rows){
			if(error) {
				callback(error, filename, false);
			} else {
				console.log("--subscribed users:", rows);
				callback(null, filename, rows);
			}
		});
	}

} 

module.exports = new Notification();