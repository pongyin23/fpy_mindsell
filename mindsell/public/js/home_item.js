function renderPopularCourses(filteredCourses,id){
	//- var filteredCourses = !{JSON.stringify(courses)};

	var list = document.getElementById(id);
	list.innerHTML = '';

	//- var reminder = filteredCourses.length%6;

	for(var i = 0; i < (filteredCourses.length); i+=6) {

		var course = [];

		for(var j =0; j<6; j++){
			if (j+i== filteredCourses.length){
				break;
			}
			// Create html code for showing course details
			course[j] = document.createElement('div');
			course[j].setAttribute('class', 'col-md-2');
			course[j].setAttribute('title', filteredCourses[j+i].title);
			var courseLink = document.createElement('a');
			courseLink.setAttribute('href', '/course/details?courseId=' + filteredCourses[j+i].courseId);
			var courseImg = document.createElement('img');
			// TODO: select the image by courseId fomr database
			courseImg.setAttribute('src', filteredCourses[j+i].image == null ? '../img/empty_img.gif' : '../img/course/' + filteredCourses[j+i].image);
			courseImg.setAttribute('class', 'img-responsive');
			var content = document.createElement('div');
			content.setAttribute('class', 'ss-item-text');
			var title = document.createElement('h5');
			title.setAttribute('class', 'item-title');
			$(title).html(filteredCourses[j+i].title);
			var details = document.createElement('h5');
			details.setAttribute('class', 'item-details');
			var price = document.createElement('i');
			price.setAttribute('class', 'item-price');
			if(filteredCourses[j+i].price) {
				$(price).html('$' + filteredCourses[j+i].price);
			}
			else {
				$(price).html('Free');
			}
			
			// TODO: select student number of course
			var studentNum = document.createElement('i');
			studentNum.setAttribute('class', 'student-count fa fa-user-o');
			$(studentNum).html('&nbsp;' + 0);
			var favoriteNum = document.createElement('i');
			favoriteNum.setAttribute('class', 'favorite-count fa fa-heart-o');
			$(favoriteNum).html('&nbsp;' + filteredCourses[j+i].popularity + '&nbsp;');

			details.appendChild(price);
			details.appendChild(studentNum);
			details.appendChild(favoriteNum);
			//- title.appendChild(details);
			content.appendChild(title);
			content.appendChild(details);
			courseLink.appendChild(courseImg);
			course[j].appendChild(courseLink);
			course[j].appendChild(content);
		}
		//- var ss-item = document.createElement('div');
		//- item.setAttribute('class','item.row.ss-item');
		//- var row = document.createElement('div');
		//- item.setAttribute('class','item.row.ss-item');
		var item = document.createElement('div');

		if (i==0){
			item.setAttribute('class','item active row ss-item');
		} else{
			item.setAttribute('class','item row ss-item');
		}

		for(var j =0; j<6; j++){
			if (j+i == filteredCourses.length){
				break;
			}
			item.appendChild(course[j]);
		}
		
		list.appendChild(item);

	}      

}