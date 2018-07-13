var mysql = require('mysql');
var path = require('path');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

var filename = path.basename(__filename);

class Theme {
	getThemeById(id, callback) {
		connection.query('SELECT * FROM theme WHERE themeId = "' + id + '";', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				callback(null, filename, rows);
			}
		});
	}

	getCurrentTheme(callback) {
		connection.query('SELECT * FROM theme ORDER BY themeId DESC LIMIT 1;', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				var data = rows[0];
				console.log('SELECT * FROM theme_image WHERE themeId = "' + data.themeId + '";');
				connection.query('SELECT * FROM theme_image WHERE themeId = "' + data.themeId + '";', function(error, theme, fields) {
					if(error) {
						callback(callback, filename, null);
					} else {
						console.log("Row data = " + theme[0].path);
						data.imagePath1 = theme[0].path;
						data.imagePath2 = theme[1].path;
						data.imagePath3 = theme[2].path;
						callback(null, filename, data);
					}
				});
			}
		});
	}

	addTheme(title, introduction, history, background, image1, image2, image3, content, hashtag, callback) {

		connection.query('INSERT INTO theme (title, introduction, background, history, content, hashtag) VALUES ("' + title + '", "' + introduction + '", "' + background + '", "' + history + '", "' + content + '", "' + hashtag + '");', function(error, rows, fields) {
			if(error) {
				callback(error, filename, null);
			} else {
				var newId = rows.insertId;
				connection.query('INSERT INTO theme_image (PATH, themeId) VALUES (?, ?), (?, ?), (?, ?);',[image1,newId,image2,newId,image3,newId], function(error, rows, fields) {
					if(error) {
						callback(error, filename, null);
					} else {
						console.log("ROW = " + rows);
						rows.themeId = newId;
						callback(null, filename,rows);
					}
				});
			}	
		});
	}
}

module.exports = new Theme();