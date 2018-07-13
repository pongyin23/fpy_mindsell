function subscribe(tutorDetails,user) {
			$("#subscribe").on('click', function() {
				console.log(tutorDetails.userId, user.userId);
				if(isFollowed==0) {
					follow(tutorDetails,user);
				} else{
					unfollow(tutorDetails,user);
				}

			});
			
		};

function checkStreaming(url){
	if (url == null){
		console.log("not streaming",url);
		$("#streaming").attr("style","display: none");

	}else{
		console.log("is streaming",url);
		$("#streaming").attr("href","/livestream?livestream_path="+url);
	}
}

function follow(tutorDetails,user){
	var subscription = {
			userId:user.userId,
			tutorId:tutorDetails.userId,
			nickname:user.nickname
		}

	$.ajax({
		url: '/tutor_profile/subscribe',
		type: 'GET',
		data: subscription,

		success: (result) =>{
			if (result){
				console.log(result);
				console.log("success");
				isFollowed = 1;
				$('#subscribe').attr('class', 'btn');
				$('#subscribe').html('Followed');
			} else{
				console.log("fail")
			}

		},
		error: ( jqXHR, textStatus, errorThrown ) => { 
			console.error(textStatus, errorThrown);
		}
	});
}

function unfollow(tutorDetails,user){
	var subscription = {
		userId:user.userId,
		tutorId:tutorDetails.userId
	}
	$.ajax({
	url: '/tutor_profile/unfollow',
	type: 'GET',
	data: subscription,

	success: (result) =>{
		if (result){
			console.log(result);
			console.log("success unfollow");
			isFollowed = 0;
			$('#subscribe').attr('class', 'btn btn-primary');
			$('#subscribe').html('Follow');
		} else{
			console.log("fail")
		}

	},
	error: ( jqXHR, textStatus, errorThrown ) => { 
		console.error(textStatus, errorThrown);
	}
});
}
//- function updateTutorProfile(data) {
//- 	console.log(success);
//- }

function loadChart(rating) {
	var ctx = document.getElementById("tutorChart");
	console.log("rating is:",rating);
	var myChart = new Chart(ctx, {
			type: 'radar',
			data: {
					labels: ["Professional", "Creative", "Useful", "Interesting", "Detailed", "Clear"],
					datasets: [{
							label: 'Score: ',
							data: [rating[0], rating[1], rating[2], rating[3], rating[4], rating[5]],
							backgroundColor: [
									'rgba(255, 99, 132, 0.2)',
									'rgba(54, 162, 235, 0.2)',
									'rgba(255, 206, 86, 0.2)',
									'rgba(75, 192, 192, 0.2)',
									'rgba(153, 102, 255, 0.2)',
									'rgba(255, 159, 64, 0.2)'
							],
							borderColor: [
									'rgba(255,99,132,1)',
									'rgba(54, 162, 235, 1)',
									'rgba(255, 206, 86, 1)',
									'rgba(75, 192, 192, 1)',
									'rgba(153, 102, 255, 1)',
									'rgba(255, 159, 64, 1)'
							],
							borderWidth: 1,
					}]
			},
			options: {
				maintainAspectRatio: true,
				scale: {
						ticks: {
							beginAtZero: true,
							max: 10,
							min: 0,
							stepSize: 2
						}
				}
			}
	});
}