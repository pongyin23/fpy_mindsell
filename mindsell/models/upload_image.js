var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

var filename = path.basename(__filename);

// app.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, 'views/index.html'));
// });
class Upload{
	uploadFile(req,callback){

		console.log("~~~~~entered.")

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
			console.log('Success');
		// res.end('success');
		});

		// parse the incoming request containing the form data
		form.parse(req);

	};
}


module.exports = new Upload();

// var server = app.listen(8080, function(){
//   console.log('Server listening on port 3000');
// });
