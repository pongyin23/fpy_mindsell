function showCommentDetails(details) {

	//- var comment = [];

	for(var i =  0; i < details.length; i++) {
		// console.log("photo", details[i].photo);
		if (details[i].photo== ""){
			details[i].photo = null;
			// console.log("empty now");
			// }else{
			// console.log("not empty");
			}
		printComment(details[i].nickname,details[i].content,details[i].photo);
	}
}

function printComment(nickname,content,photo){
	var list = document.getElementById('comments');
	//- list.innerHTML = '';
	var comment = document.createElement('div');
	comment.setAttribute('class', 'row course-field');

	var icon_side = document.createElement('div');
	icon_side.setAttribute('class', 'col-sm-1');
	var icon_boundary = document.createElement('div');
	icon_boundary.setAttribute('class', 'thumbnail');
	var commenter_icon = document.createElement('img');
	commenter_icon.setAttribute('class', 'img-responsive user-photo');
	commenter_icon.setAttribute('src', photo == null ? '../img/empty_img.gif' : '../img/user/' + photo);

	var chatbox_side = document.createElement('div');
	chatbox_side.setAttribute('class', 'col-sm-5');

	var chatbox_boundary = document.createElement('div');
	chatbox_boundary.setAttribute('class', 'panel panel-default');
	//- chatbox_boundary.setAttribute('id', 'commentCSS');

	var commenter_name = document.createElement('div');
	commenter_name.setAttribute('class', 'panel-heading');
	commenter_name.setAttribute('id', 'commentCSS');
	$(commenter_name).html(nickname);

	var commenter_content_boundary = document.createElement('div');
	commenter_content_boundary.setAttribute('class', 'panel-body comment');

	var commenter_content = document.createElement("Panel");
	$(commenter_content).html(content);

	commenter_content_boundary.appendChild(commenter_content);
	chatbox_boundary.appendChild(commenter_name);
	chatbox_boundary.appendChild(commenter_content_boundary);
	chatbox_side.appendChild(chatbox_boundary)
	icon_boundary.appendChild(commenter_icon);
	icon_side.appendChild(icon_boundary);
	comment.appendChild(icon_side);
	comment.appendChild(chatbox_side);

	//- list.appendChild(comment);
	list.insertBefore(comment,list.firstChild);
}

function showCourseDetails(details) {
	var courseTitle = document.getElementById('course-title');
	$(courseTitle).html(details.title);
	// console.log(details);

	var courseImage = document.getElementById('course-image');
	courseImage.setAttribute('src', details.image == null ? '../img/empty_img.gif' : '../img/course/' + details.image);

	courseImage.setAttribute('class', 'img-responsive');

	$('#course-tutor').html(details.tutorname);
	$('#course-date').html(details.createDate);
	if(details.price == 0) {
		$('#course-price').html('Free');

	} else {
		$('#course-price').html(details.price);
	}

	if (details.tutorContact != null){
		$('#course-contact').html(details.tutorContact);
	} else{
		$('#course-contact').html('95864543');
	}
	
	if(details.rating != null) {
		$('#course-rating').html(details.rating + '/10');
	} else {
		$('#course-rating').html('5/10');
	}
	//- $('#course-location').html(details.location);
	//- if(details.location != null) {
	//- 	var mapMarker = document.createElement('a');
	//- 	mapMarker.setAttribute('class', 'fa fa-map-marker');
	//- 	mapMarker.setAttribute('style', 'text-decoration: none; margin-left: 10px;');
	//- 	mapMarker.setAttribute('href', 'https://www.google.com.hk/maps/place/Wong+Tai+Sin+Station/@22.3415527,114.1908621,17z/data=!3m1!4b1!4m5!3m4!1s0x340406d8f9ba56df:0x20a7fbfb6a3b170c!8m2!3d22.3415527!4d114.1930508');
	//- 	mapMarker.setAttribute('target', '_blank');

	//- 	var location = document.getElementById('location');
	//- 	location.appendChild(mapMarker);
	//- }
	$('#course-youtubelink').attr('href', details.youtubeLink);
	$('#course-youtubelink').attr('target', '_blank');
	$('#course-youtubelink').html(details.youtubeLink);
	$('#course-description').html(details.description);
	if(details.liked) {
		$('#fav-button').attr('style', 'color: red');
		$('#course-favorite').html(details.popularity+1);	
	} else {
		$('#fav-button').attr('style', 'color: rgba(30, 22, 54, 0.6)');
		$('#course-favorite').html(details.popularity);	
	}
	if(details.enrolled) {
		$('#enroll-button').html('Enrolled');
	} else {
		$('#enroll-button').html('Enroll');
	}
}

function updateCourseLiked(details) {

 	$("#fav-button").on('click', function() {
 		record = record ? 0 : 1;

			var liked = {
				courseId: details.courseId,
				isliked: record,
				tutorId: details.userId,
				courseTitle: details.title,
			}

		$.ajax({
			url: '/course/update_like',
			method: 'GET',
			data: liked,

			success: (result) => {
				if(record) {
					$('#fav-button').attr('style', 'color: red');
					$('#course-favorite').html(details.popularity+1);
										
				} else {
					$('#fav-button').attr('style', 'color: rgba(30, 22, 54, 0.6)');
					$('#course-favorite').html(details.popularity);
				}
			},
			error: ( jqXHR, textStatus, errorThrown ) => { 
				console.error(textStatus, errorThrown);
			}      
		});     
	});
}

function enrollCourse(details,user) {
	$("#enroll-button").on('click', function() {
		var student = $('#user-id').val();
		var courseId = details.courseId;
		var tutorId = details.userId;
		var courseTitle = details.title;

		//- var user = !{JSON.stringify(user)};
		
		if(user.userId != null) {
			var enrollData = {
				userId: student,
				courseId: courseId,
				courseTitle: courseTitle,
				tutorId: tutorId,
			}

			$.ajax({
				url: '/course/enroll_course',
				method: 'GET',
				data: enrollData,

				success: (result) => {
					if(result) {
						// console.log(1);
						$('#enroll-button').html('Enrolled');
					} else {
						$('#enroll-button').html('Enroll');
						// console.log(0);
					}							
				},
				error: ( jqXHR, textStatus, errorThrown ) => { 
					console.error(textStatus, errorThrown);
				}      
			});
		} else {
			showAlertMsg();
		}    
	});		
}

function sendComments(details,user){
	$('#sendComments').on('click', function(){
		var comment = $('#commentContent').val();
		// console.log(comment);

		var commentData ={
			courseId: details.courseId,
			comment: comment,
			tutorId: details.userId,
			courseTitle: details.title,
		}

		$.ajax({
			url: '/course/update_comment',
			method: 'GET',
			data: commentData,

			success: (result) => {
				if(result) {
					// console.log("success");
					$('#commentContent').val('');
					// console.log(result);
					printComment(user.nickname,comment,user.photo)
				} else {
					console.log("fail");
				}							
			},
			error: ( jqXHR, textStatus, errorThrown ) => { 
				console.error(textStatus, errorThrown);
			}
		})
	})
}

function sendRating(details,user){
	$("#submitRating").on('click', function(){
		var rating = [$("#rateProfessional").val(),$("#rateCreative").val(),
			$("#rateUseful").val(),$("#rateInteresting").val(),
			$("#rateDetailed").val(),$("#rateClear").val()];

		var ratingData = {
			rating: rating,
			tutorId: details.userId,
			courseId: details.courseId,
			userId: user.userId,
		}

		$.ajax({
			url: '/course/update_rating',
			method: 'GET',
			data: ratingData,

			success: (result) => {
				if(result) {
					console.log("success");
				} else {
					console.log("fail");
				}							
			},
			error: ( jqXHR, textStatus, errorThrown ) => { 
				console.error(textStatus, errorThrown);
			}      
		})
	});
}

function showAlertMsg() {
	var delMsg = document.getElementById('alert-msg');
	if(delMsg != null) {
		delMsg.parentNode.removeChild(delMsg);
	}

	var alertMsg = document.createElement('span');
	alertMsg.setAttribute('id', 'alert-msg');
	var txt = document.createTextNode('Please Login First!');
	alertMsg.setAttribute('style', 'color: red; text-align: center; display: block; margin-top: 10px;');
	alertMsg.appendChild(txt);

	var row = document.createElement('div');
	row.setAttribute('class', 'row');
	row.appendChild(alertMsg);

	var con = document.getElementById('course-info');
	con.appendChild(row);
}

function rating(){
	$('#rate-button').on('click', function(){
		var rating = [5,5,5,5,5,5];
		// loadChart(rating);
	});
}

// function loadChart(rating) {
	// var ctx = document.getElementById("ratingRadar");
	// var myChart = new Chart(ctx, {
	// 		type: 'radar',
	// 		data: {
	// 				labels: ["Professional", "Creative", "Useful", "Interesting", "Detailed", "Clear"],
	// 				datasets: [{
	// 						label: 'Ratings ',
	// 						data: [rating[0], rating[1], rating[2], rating[3], rating[4], rating[5]],
	// 						backgroundColor: [
	// 								'rgba(255, 99, 132, 0.2)',
	// 								'rgba(54, 162, 235, 0.2)',
	// 								'rgba(255, 206, 86, 0.2)',
	// 								'rgba(75, 192, 192, 0.2)',
	// 								'rgba(153, 102, 255, 0.2)',
	// 								'rgba(255, 159, 64, 0.2)'
	// 						],
	// 						borderColor: [
	// 								'rgba(255,99,132,1)',
	// 								'rgba(54, 162, 235, 1)',
	// 								'rgba(255, 206, 86, 1)',
	// 								'rgba(75, 192, 192, 1)',
	// 								'rgba(153, 102, 255, 1)',
	// 								'rgba(255, 159, 64, 1)'
	// 						],
	// 						borderWidth: 1,
	// 				}]
	// 		},
	// 		options: {
	// 			maintainAspectRatio: false,
	// 			scale: {
	// 				ticks: {
	// 					beginAtZero: true,
	// 					max: 10,
	// 					min: 0,
	// 					stepSize: 2

	// 				}
	// 			},
	// 		}
	// });
// }
function initRadar(rating){
	$("#rateProfessional").val(rating[0]);
	$("#rateCreative").val(rating[1]);
	$("#rateUseful").val(rating[2]);
	$("#rateInteresting").val(rating[3]);
	$("#rateDetailed").val(rating[4]);
	$("#rateClear").val(rating[5]);
}

function updateRadar(category,value){
	myChart.data.datasets[0].data[category] = value;
	// console.log("new value is ",value);
	myChart.update();
}
