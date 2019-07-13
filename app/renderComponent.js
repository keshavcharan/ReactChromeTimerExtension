import React from 'react';
import ReactDOM from 'react-dom';
import NextForm from './nextform.js'
import ProgressTimer from './reactComponents/progressTimer.js'

export function renderPage(inprogress, timertimes) {
	if(inprogress == "true") {
		ReactDOM.unmountComponentAtNode(document.getElementById('app'))
		ReactDOM.render(<NextForm/>, document.getElementById('app'))
	} else {
		ReactDOM.render(<ProgressTimer starttime={timertimes.currentStartTime} times={timertimes.currentTimeSet} />, document.getElementById('app'))
	}
}