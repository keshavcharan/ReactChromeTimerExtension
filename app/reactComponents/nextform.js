import React, { Component } from 'react'

import '../index.css';
import OptionMenu from './optionsMenu.js'
import Form from 'react-bootstrap/Form'
import SubmitButton from './submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom' 

var loginset = require('../referenceVars/loginsettings.js')

class NextForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timertime: 0,
			todotext: "To Do",
			dummy : "false"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.handleTimerValueChange = this.handleTimerValueChange.bind(this);
		this.logoutsess = this.logoutsess.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const t = this.state.timertime;
		const todo = this.state.todotext;
		this.props.submitFormCallback(t, todo);
	}

	handleTextAreaChange(event) {
		this.setState( { todotext: event.target.value })
	}

	handleTimerValueChange(event) {
		this.setState( { timertime: event.target.value })
	}

	logoutsess(event) {
		event.preventDefault();
		loginset.isLoggedIn = "false";
		this.props.history.push('/auth')	
	}

	render() {
		return(
				<div>
					<Form id="nonameform" onSubmit={this.handleSubmit}>
						<Form.Group controlId="inputarea">
							<Form.Label>NEXT, I wanna complete</Form.Label>
						</Form.Group>
						<Form.Group>
							<Form.Control as="textarea" rows="3" onChange={this.handleTextAreaChange}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>in</Form.Label>
						</Form.Group>
						<Form.Group>
							<Form.Control id="hours_val" type="text" placeholder="1" onChange={this.handleTimerValueChange}/>
							<OptionMenu/>
						</Form.Group>
						<Form.Group sm={{ span: 10, offset: 2}}>
							<button  onClick={this.logoutsess}> LogOut </button>
							<SubmitButton label="Set" />
						</Form.Group>					
					</Form>
				</div>
		) 
	}
}


export default withRouter(NextForm)