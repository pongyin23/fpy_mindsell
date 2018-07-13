function livestream(user){
	$(".streambutton").on('click', function() {
		// $('#livestream-button').attr('data-toggle', 'modal');
		// var streamUrl;
		checkIsStreaming(user.userId);
		// if (streamUrl == 0){
		// 	console.log("url is4",streamUrl);
		// 	$('#livestream-button').attr('data-target', '#livestreamLink');
		// }else{
		// 	console.log("url is3",streamUrl);
		// 	$('#livestream-button').attr('data-target', '#livestreamWarning');
		// 	$('#warningStreamUrl').attr('href',"/livestream?livestream_path="+streamUrl);
		// }
		
		
	});
	createStream(user);
}

//distinguish the the streaming platform
function stream_type(path){
	if ($("#stream").prop('checked')==true){
		console.log("youtube");
		var linkId = path.split('https://youtu.be/')[1];
		path = "youtube/"+linkId;
		return path;
	}else{
		console.log("twitch");
		path = "twitch/"+path;
		return path;;
	}

}

function createStream(user){
	$("#update-path").on('click', function() {
		var title = $('#stream-title').val();
		var description = $('#stream-description').val();
		var raw_path = $('#stream-link').val();
		var path = stream_type(raw_path);
		console.log(path);
		// var linkId = path.split('https://youtu.be/')[1];
		// var sp = "https://www.youtube.com/embed/"+linkId;
		var details = {
			userId: user.userId,
			nickname: user.nickname,
			livestreamTitle: title,
			livestreamDescription: description,
			livestreamPath: path,
			isEnded: 0,
		}

		$.ajax({
			url: '/livestream/add_livestream',
			type: 'POST',
			data: details,
			success: (result) => {
				if(result) {
					console.log('success');
					// console.log(result);
					window.location.replace("http://localhost:3000/livestream?livestream_path=" + result);
				} else {
					console.log('fail');
				}
			},
			error: ( jqXHR, textStatus, errorThrown ) => { 
				console.error(textStatus, errorThrown);
			}
		});

	});
}

function checkIsStreaming(userId){
	console.log(userId);
	var details ={
		userId: userId
	}
	var url;
	return $.ajax({
		url: '/livestream/check_streaming',
		type: 'GET',
		data: details,
		success:(result)=>{
			console.log(result);
			if (result==''){
				openPanel();
			}else{
				openWarning(result);
			}
		},
		error: ( jqXHR, textStatus, errorThrown ) => { 
			console.error(textStatus, errorThrown);
		}
	});
}

function openWarning(url){
	console.log("open warning",url);
	$('#livestreamWarning').modal('show');
	$('#warningStreamUrl').attr('href',"/livestream?livestream_path="+url);

}

function openPanel(){
	$('#livestreamLink').modal('show');
}