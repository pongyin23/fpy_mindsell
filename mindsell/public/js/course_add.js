function showImage() {
	$(":file").change(function () {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = imageIsLoaded;
			reader.readAsDataURL(this.files[0]);
			$('#course-image').val(this.files[0].name);
			canvas.setAttribute('data-toggle',"modal");
			canvas.setAttribute('data-target',"#editor");
			// console.log("#course-image is",$('#course-image').val());
			// console.log("file data is ",this.files[0]);

			//create the edit button
			var editor = document.getElementById("edit-image");
			editor.innerHTML = '';
			var edit_button = document.createElement('input');
			edit_button.setAttribute('class', 'btn btn-primary');
			edit_button.setAttribute('style', 'width: 100px')
			edit_button.setAttribute('type', 'button');
			edit_button.setAttribute('data-toggle',"modal");
			edit_button.setAttribute('data-target',"#editor");
			edit_button.setAttribute('value',"Edit");

			editor.appendChild(edit_button);

		};

	}); 
};

// function createEditor(){
// 	// $("#editor").on("shown.bs.modal",function(){
// 	// 	console.log("hi")
// 	// })
// }

function imageIsLoaded(e) {
	// console.log(e.target);
	canvas.setAttribute("style","display: block");

	var imageUrl;
	context = canvas.getContext('2d');

	load_img1()
	function load_img1(){
		img = new Image();
		img.crossOrigin = '';
		img.src = e.target.result;

		img.onload = function () {	
			canvas.width = 500;
			canvas.height = img.height * 500 / img.width;
			context.drawImage(img, 0, 0, canvas.width, canvas.height);
			// console.log("1:",canvas.width, canvas.height);

		};

	}
	setTimeout(function(){
		// console.log("save real size");
		imageUrl = canvas.toDataURL();
		// console.log(imageUrl)
	},100)
	setTimeout(function(){
		load_img2()
	},100)
	function load_img2(){
		context2 = canvas2.getContext('2d');
		img = new Image();
		img.crossOrigin = '';
		img.src = imageUrl;

		img.onload = function () {
			canvas2.width = img.width;
			canvas2.height = img.height;
			context2.drawImage(img, 0, 0, img.width, img.height);
			// console.log("2:",canvas2.width, canvas2.height);
			canvas2.setAttribute("style","width:img.width;height:img.height");
		};
	}
	setTimeout(function(){
		createModal(imageUrl);
	},100)
	// createEditor(e.target.result);
	// updateFilterValue();
};

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

function AddNewCourse(user) {
	$("#course-submit").on('click', function() {
		if(user.userId != null) {

			var userId = user.userId;
			var title = $('#title').val();
			var description = $('#description').val();
			var category = $('#category').val();
			var youtubeLink = $('#youtubelink').val();
			var courseImage = $('#course-image').val();
			var location = $('#location').val();
			var price = $('#price').val();

			var files = $('#inputfile').get(0).files;

			if (files.length > 0){
				// for (var i = 0; i < files.length; i++) {
				// 	var file = files[i];
				// 	formData.append('uploads[]', file, file.name);
				// }
				var dataURL = canvas.toDataURL('image/jpg');
				var blob = dataURItoBlob(dataURL);
				var fd = new FormData();
				fd.append("canvasImage", blob, files[0].name);

				$.ajax({
					url: '/course/upload',
					type: 'POST',
					data: fd,
					processData: false,
					contentType: false,
					success: function(data){
						console.log('upload successful!\n' + data);
					},
					error: ( jqXHR, textStatus, errorThrown ) => {
						console.error(textStatus, errorThrown);
					} 
				});
			}

			var courseDetails = {
				userId : userId,
				title: title,
				description: description,
				category: category,
				youtubeLink: youtubeLink,
				courseImage: courseImage,
				location: location,
				price: price,
			}

			// console.log(courseDetails);

			$.ajax({
				url: '/course/addCourse',
				method: 'POST',
				data: courseDetails,

				success: (result) => {
					if(result) {
						console.log('aaaaa');
						window.location.href = window.location.href;
					} else {
						$('#addCourseMsg').attr('style', 'visibility: hidden');
						console.log('bbbb');
					}
				},
				error: ( jqXHR, textStatus, errorThrown ) => {
					console.error(textStatus, errorThrown);
				} 
			});
		} else {
			console.log("User has not login, cannot create a new course");
		}
	});
}