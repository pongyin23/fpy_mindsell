function showFilteredCourses(filteredCourses) {
      //- var filteredCourses = !{JSON.stringify(data)};

      var list = document.getElementById('courses');
      list.innerHTML = '';

      for(var i = 0; i < filteredCourses.length; i++) {
        // Create html code for showing course details
        var course = document.createElement('div');
        course.setAttribute('class', 'col-md-3');
        course.setAttribute('title', filteredCourses[i].title);
        var courseLink = document.createElement('a');
        courseLink.setAttribute('href', '/course/details?courseId=' + filteredCourses[i].courseId);
        var courseImg = document.createElement('img');
        // TODO: select the image by courseId fomr database
        if(filteredCourses[i].image) {
          courseImg.setAttribute('src', '../img/course/' + filteredCourses[i].image);
        } else {
          courseImg.setAttribute('src', '../img/empty_img.gif');
        }
        console.log(filteredCourses[i].image);
        courseImg.setAttribute('class', 'img-responsive');
        var content = document.createElement('div');
        content.setAttribute('class', 'ss-item-text');
        var title = document.createElement('h5');
        title.setAttribute('class', 'item-title');
        $(title).html(filteredCourses[i].title);
        var details = document.createElement('h5');
        details.setAttribute('class', 'item-details');
        var price = document.createElement('i');
        price.setAttribute('class', 'item-price');
        if(filteredCourses[i].price) {
          $(price).html('$' + filteredCourses[i].price);
        }
        else {
          $(price).html('Free');
        }
        // TODO: select student number of course
        
        console.log("course: ",filteredCourses[i].studentNumber);
        var studentNum = document.createElement('i');
        studentNum.setAttribute('class', 'student-count fa fa-user-o');
        $(studentNum).html('&nbsp;' + filteredCourses[i].studentNumber);
        console.log(filteredCourses[i].studentNumber);
        var favoriteNum = document.createElement('i');
        favoriteNum.setAttribute('class', 'favorite-count fa fa-heart-o');
        $(favoriteNum).html('&nbsp;' + filteredCourses[i].popularity + '&nbsp;');
        details.appendChild(price);
        details.appendChild(studentNum);
        details.appendChild(favoriteNum);
        //- title.appendChild(details);
        content.appendChild(title);
        content.appendChild(details);
        courseLink.appendChild(courseImg);
        course.appendChild(courseLink);
        course.appendChild(content);

        list.appendChild(course);
      }      
    }