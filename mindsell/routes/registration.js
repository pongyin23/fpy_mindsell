var express = require('express');
var router = express.Router();
var path = require('path');

var user_model = require('../models/user_model');

/* GET registration page. */
router.get('/', function(req, res, next) {
	res.render('registration');
});

router.post('/register', function(req, res, next) {
	var username = req.body.username;
	var email  = req.body.email;
	var password = req.body.password;

	user_model.register(username, email, password, function(err, filename) {
		if(err) {
			console.log(filename + ": " + err);
		} else {
			res.redirect('/login');
		}
	});
})


module.exports = router;
