import React, {Component} from 'react'
import NextForm from './nextform.js'
import ProgressTimer from './progressTimer.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


var params = require('../referenceVars/paramsset.js');

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dummy: 0
		}
		this.onFormSubmit= this.onFormSubmit.bind(this);
		this.backToForm = this.backToForm.bind(this);
	}

	onFormSubmit(timerval, todotext) {
		console.log("setting params");
		params.inprogress = "true";	
		params.timertimes.currentStartTime=new Date().getTime()/1000;
		params.timertimes.currentTimeSet=timerval*6;

		let newval = this.state.dummy;
		this.setState({dummy: newval+1});
	}

	backToForm() {
		params.inprogress = "false";	
		params.timertimes.currentStartTime=new Date().getTime()/1000;
		params.timertimes.currentTimeSet=0;

		let newval = this.state.dummy;
		this.setState({dummy: newval-1});	
	}

	render() {
		let renderform;
		if(params.inprogress == "false") {
			renderform = <NextForm submitFormCallback={this.onFormSubmit}/>;
		} else {
			renderform = <ProgressTimer timerCallback={this.backToForm} starttime={params.timertimes.currentStartTime} times={params.timertimes.currentTimeSet}/>;
		}

		return(
			<div>
				{renderform}
			</div>
		)
	}
}

export default withRouter(AppComponent)