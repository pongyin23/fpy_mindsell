// app/passport_login.js
var user_model = require('../models/user_model');

module.exports = function(app, passport) {

	// Show home page
	// app.get('/', function(req, res) {
	// 	res.render('index', {
	// 		// Get the user out of session and pass to templatez
	// 		user : (req.user ? req.user : null)
	// 	});
	// });

	// Show the login form
	app.get('/login', function(req, res) {
		// Render the page and pass in any flash data if it exists
		res.render('login', { message : req.flash('loginMessage') });
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		console.log("--------",req.user);
		res.render('profile', {
			user : req.user // Get the user out of session and pass to templatez
		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// Process the login form
	app.post('/login', 
		passport.authenticate('local-login', {
						successRedirect : '/', // Redirect to the secure profile section
						failureRedirect : '/login', // Redirect back to the signup page if there is an error
						failureFlash : true // Allow flash messages
				}),
		function(req, res) {
			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});

	app.post('/change_password', function(req, res) {
		var passwordData = req.body;

		console.log(passwordData);
		user_model.getUserProfile(passwordData.username, function(err, filename, data) {
			if(err) {
				console.log(filename + ": " + err);
			} else {
				console.log('user psw: ' + data.password);
				console.log('input psw:' + passwordData.currentPassword);
				if(data.password == passwordData.currentPassword) {
					user_model.changePassword(passwordData.username, passwordData.newPassowrd, function(err, filename, data) {
						if(err) {
							console.log(filename + ": " + err);
						} else {
							res.redirect('/login');
						}		
					});
				} else {
					res.redirect('/user/setting?message=Wrong+password!+Try+again');
				}
			}					
		});		
	});

	// app.get('*', function(req, res, next) {
	// 	// put user into res.locals for easy access from templates
	// 	res.locals.user = req.user || null;

	// 	if(res.locals.user) {
	// 		next();
	// 	} else {
	// 		res.redirect('/login');
	// 	}
	// });	
};

	// Route middleware to make sure
	function isLoggedIn(req, res, next) {

	// If user is authenticated in the session, carry on
	if (req.isAuthenticated()) {
		res.locals.user = req.user || null;
		return next();
	}

	// If they aren't redirect then to the home page
	res.redirect('/login');
}
