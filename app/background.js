function hello() {
	var hours = document.getElementById("hours_val").value;
	window.alert(hours);
}

document.getElementById("nonameform").addEventListener("submit", function(e) {
	e.preventDefault();
	hello();
});