import React, { Component } from 'react'
var params = require('../referenceVars/paramsset.js');
//var mainComponent = require('../renderComponent.js')

class ProgressTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {displaytime : this.getTimerTime()};
	}	

	getTimerTime() {
		var timetillnow = parseInt((new Date().getTime()/1000) - this.props.starttime);
		return (parseInt(this.props.times) - timetillnow);
	}

	componentDidMount() {
		this.timerId = setInterval(() => this.countdown(), 1000);
	}

	countdown() {
		var showtime = this.getTimerTime();
		if(showtime == 0) {
			this.props.timerCallback();		
		} else {
			this.setState ({
				displaytime : showtime
			});
		}
	}
	
	componentWillUnmount() {
		clearInterval(this.timerId);
	}

	render() {
		return(
			<div>
				<label>It is {this.state.displaytime}</label>
			</div>
		);
	}

}

export default ProgressTimer;