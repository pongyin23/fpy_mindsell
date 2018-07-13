function cross_platform(){
	// facebook share button setting
	window.fbAsyncInit = function() {
	    FB.init({
	      appId : '1814052642232833',
	      xfbml : true,
	      version : 'v2.3'
	    });
	  };

	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = 'https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v2.12&appId=1814052642232833&autoLogAppEvents=1';
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	// twitter share button setting
	window.twttr = (function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
			t = window.twttr || {};
		if (d.getElementById(id)) return t;
		js = d.createElement(s);
		js.id = id;
		js.src = "https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);

		t._e = [];
		t.ready = function(f) {
			t._e.push(f);
		};
		return t;
	}(document, "script", "twitter-wjs"));

	// var pinOneButton = document.querySelector('.pinterest');
	//     pinOneButton.addEventListener('click', function() {
	//         PinUtils.pinOne({
	//             media: e.target.getAttribute('data-media'),
	//             description: e.target.getAttribute('data-description')
	//         });
	//     });
}