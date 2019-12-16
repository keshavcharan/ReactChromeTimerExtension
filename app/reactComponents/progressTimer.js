import React, { Component } from 'react'
var params = require('../referenceVars/paramsset.js');

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
		if(showtime <= 0) {
			this.props.timerCallback(this.props.starttime, this.props.taskname, true);		
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
		const tottime = this.state.displaytime
		const displaytimemin = ('0' + parseInt(tottime/60)).substr(-2)
		const displaytimesec = ('0' + parseInt(tottime%60)).substr(-2)
		
		return(
			<div>
				<label>My current Task is {this.props.taskname} until {displaytimemin}:{displaytimesec} mins</label>
			</div>
		);
	}

}

export default ProgressTimer;