function getUserProfile(user) {
			$.ajax({
				url: '/user/user_profile',
				type: 'GET',
				data: user,

				success: function(result) {
					updateCourseProfile(result);
					loadChart(result.rating);
				},
				error: ( jqXHR, textStatus, errorThrown ) => { 
					console.error(textStatus, errorThrown);
				}
			});
		}

function updateCourseProfile(data) {
	if(data) {
		$('#user-name').text(data.nickname);
		$('#self-introduction').text(data.introduction);

		if(data.photo) {
			$('#profile-picture').attr('src', '../img/user/' + data.photo);
		}  else {
			$('#profile-picture').attr('src', '../img/empty_img.gif');
		}
	}
}

function loadChart(rating) {
	var ctx = document.getElementById("myChart");
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