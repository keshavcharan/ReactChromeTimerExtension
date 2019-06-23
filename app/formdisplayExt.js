window.onload = function() {
	var url=document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	window.alert(url);
	var headerel = document.getElementById("display");
	for(var i = 0; i < params.length; i++) {
		headerel.innerHTML+=params[i];
	}
}