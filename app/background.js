var params = require('./paramsset.js');
var mainComponent = require('./renderComponent.js')

document.getElementById("nonameform").addEventListener("submit", function(e) {
	e.preventDefault();
	var hours = document.getElementById("hours_val").value;

	params.inprogress = "false";	
	params.timertimes.currentStartTime=new Date().getTime()/1000;
	params.timertimes.currentTimeSet=hours*60*60;

	mainComponent.renderPage(params.inprogress, params.timertimes);
});
