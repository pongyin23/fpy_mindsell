var fname = [];
var param;

function showImage(num) {
		var id = "theme-image"+num;
		var edit_id = "edit-image"+num;
		var input_id = "#inputfile"+num;
	$(input_id).change(function () {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e){
				// console.log("id is",id);
				var current_canvas = document.getElementById(id);

				current_canvas.setAttribute("style","display: block");

				var imageUrl;
				context = current_canvas.getContext('2d');

				load_img1()
				function load_img1(){
					img = new Image();
					img.crossOrigin = '';
					img.src = e.target.result;

					img.onload = function () {
						if (id == "theme-image"){
							param = 1000;
						}else{
							param = 500;
						}
						current_canvas.width = param;
						current_canvas.height = img.height * param / img.width;
						context.drawImage(img, 0, 0, current_canvas.width, current_canvas.height);
						// console.log("off now");
					};
				};
			};
			reader.readAsDataURL(this.files[0]);
			$(id).val(this.files[0].name);
			if (num=="") {
				fname[0]=this.files[0].name;
			}else if (num=="2"){
				fname[1]=this.files[0].name;
			}else if (num=="3"){
				fname[2]=this.files[0].name;
			}
			console.log(this.files[0].name);
			// canvas.setAttribute('data-toggle',"modal");
			// canvas.setAttribute('data-target',"#editor");
			// console.log("#theme-image is",$('#theme-image').val());
			// console.log("file data is ",this.files[0]);

			//create the edit button
			// var editor = document.getElementById(edit_id);
			// editor.innerHTML = '';
			// var edit_button = document.createElement('input');
			// edit_button.setAttribute('class', 'btn btn-primary');
			// edit_button.setAttribute('style', 'width: 100px')
			// edit_button.setAttribute('type', 'button');
			// edit_button.setAttribute('data-toggle',"modal");
			// edit_button.setAttribute('data-target',"#editor");
			// edit_button.setAttribute('value',"Edit");

			// editor.appendChild(edit_button);

		};

		setTimeout(function(){
			console.log("end")
			$(input_id).off("change");
		},1000);
	});
};

function imageButton(){
	$("#inputfile").on("click",function(){
		showImage("");
	})
	$("#inputfile2").on("click",function(){
		showImage("2");
	})
	$("#inputfile3").on("click",function(){
		showImage("3");
	})
}

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
	// setTimeout(function(){
	// 	// console.log("save real size");
	// 	imageUrl = canvas.toDataURL();
	// 	// console.log(imageUrl)
	// },100)
	// setTimeout(function(){
	// 	load_img2()
	// },100)
	// function load_img2(){
	// 	context2 = canvas2.getContext('2d');
	// 	img = new Image();
	// 	img.crossOrigin = '';
	// 	img.src = imageUrl;

	// 	img.onload = function () {
	// 		canvas2.width = img.width;
	// 		canvas2.height = img.height;
	// 		context2.drawImage(img, 0, 0, img.width, img.height);
	// 		// console.log("2:",canvas2.width, canvas2.height);
	// 		canvas2.setAttribute("style","width:img.width;height:img.height");
	// 	};
	// }
	// setTimeout(function(){
	// 	createModal(imageUrl);
	// },100)

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

function AddNewTheme() {
	$("#theme-submit").on('click', function() {
		var title = $('#title').val();
		var introduction = $('#introduction').val();
		var history = $('#history').val();
		var background = $('#background').val();
		var themeImage = fname;
		var content = $('#content').val();
		var hashtag = $('#hashtag').val();

		var files = [];
		files[0] = $('#inputfile').get(0).files;
		files[1] = $('#inputfile2').get(0).files;
		files[2] = $('#inputfile3').get(0).files;
		var id_array =[];
		id_array[0] = document.getElementById("theme-image");
		id_array[1] = document.getElementById("theme-image2");
		id_array[2] = document.getElementById("theme-image3");

		var i;
		for (i = 0; i < 3; i++){
			if (files[i].length > 0){
					var dataURL = id_array[i].toDataURL('image/jpg');
					var blob = dataURItoBlob(dataURL);
					var fd = new FormData();
					fd.append("canvasImage", blob, fname[i]);
					console.log(fname[i]);

					$.ajax({
						url: '/theme/upload',
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
		}


		var themeDetails = {
			title: title,
			introduction: introduction,
			history: history,
			background: background,
			themeImage1: fname[0],
			themeImage2: fname[1],
			themeImage3: fname[2],
			content: content,
			hashtag: hashtag,
		}

		// console.log(themeDetails);

		$.ajax({
			url: '/theme/addTheme',
			method: 'POST',
			data: themeDetails,

			success: (result) => {
				if(result) {
					console.log("result = " + result.themeId);
					// window.location.href = window.location.href;
					window.location.replace("http://localhost:3000/theme?id=" + result.themeId);
				} else {
					console.log('bbbb');
				}
			},
			error: ( jqXHR, textStatus, errorThrown ) => {
				console.error(textStatus, errorThrown);
			} 
		});
	});
}