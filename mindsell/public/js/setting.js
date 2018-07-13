function getUserProfile(userDetails) {
	$('input[id=username]').val(userDetails.username);					
	$('input[id=nickname]').val(userDetails.nickname);
	$('input[id=email').val(userDetails.email);
	$('input[id=contact]').val(userDetails.contact);
	$('select[id=gender]').val(userDetails.gender);
	$('textarea[id=intro]').text(userDetails.introduction);		
}

function showMessage(message) {
	//- var message = !{JSON.stringify(msg)};
	console.log(message);
	if(message) {
		var messageDiv = document.createElement('div');
		messageDiv.setAttribute('class', 'form-group');
		var innerDiv = document.createElement('div');
		innerDiv.setAttribute('class', 'col-sm-12');
		innerDiv.setAttribute('style', 'text-align: center');
		var span = document.createElement('span');
		span.setAttribute('id', 'error-message');
		span.setAttribute('style', 'color: red');
		var text = document.createElement('i');
		$(text).html(message);

		span.appendChild(text);
		innerDiv.appendChild(span);
		messageDiv.appendChild(innerDiv);
		var form = document.getElementById('change-password-form');
		form.appendChild(messageDiv);
	}
}