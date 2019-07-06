import ProgressTimer from './reactComponents/progressTimer.js'
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<ProgressTimer/>, document.getElementById('showtimer'))

/*function TEST() {
	var url=document.location.href,
		params = url.split('?')[1].split('&'),
		data = {}, tmp;
	window.alert(url);
	var headerel = document.getElementById("display");
	for(var i = 0; i < params.length; i++) {
		headerel.innerHTML+=params[i];
	}
}*/