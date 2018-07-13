function showNotification(user) {
	if(user.userId != null) {

		$.ajax({
			url: '/notification/display_notification',
			method: 'GET',

			success: (result) => {
				if(result.length > 0) {
					console.log('successful');
					console.log(result);
					
					var newStartDiv = document.getElementById('new-notification-list');
					var oldStartDiv = document.getElementById('old-notification-list');

					result.forEach(function(obj, index, array) {
						var row = document.createElement('div');
						row.setAttribute('class', 'row col-md-12');
						var msgDate = document.createElement('span');
						msgDate.setAttribute('class', 'notification-date');
						msgDate.setAttribute('style', 'position: absolute; right:0px;');
						msgDate.innerHTML = new Date(obj.createDate).toISOString().slice(0, 10);
						var msgContent = document.createElement('span');
						msgContent.setAttribute('class', 'notification-content');
						msgContent.setAttribute('style', 'position: relative; left:0px;');
						
						var streamUrl = obj.message.split("Check out: ")[1];
						if (typeof(streamUrl) != "undefined"){
							console.log("called");
							var message = obj.message.split("Check out: ")[0];
							var streamLink = "<a href='" + streamUrl + "'>" + streamUrl + "</a>";
							msgContent.innerHTML = message + "Check out: " + streamLink;
							row.setAttribute('href', streamUrl);
						}else{
							msgContent.innerHTML = obj.message;
						}
						var hrElem = document.createElement('hr');

						row.appendChild(msgContent);
						row.appendChild(msgDate);
						row.appendChild(hrElem);
						if (obj.isRead == 0){
							newStartDiv.appendChild(row);
						} else{
							oldStartDiv.appendChild(row);
						}
						

						$.ajax({
							url: '/notification/update_notification',
							method: 'GET',

							success: (result) => {
								console.log("updated notification");
							},
							error: ( jqXHR, textStatus, errorThrown ) => { 
								console.error(textStatus, errorThrown);
							} 
						})
					});
				} else {
					console.log('failed');
				}
			},
			error: ( jqXHR, textStatus, errorThrown ) => { 
				console.error(textStatus, errorThrown);
			}      
		});
	} else {
		$(location).attr('href', '/login')
	}
}