import React, { Component } from 'react'

import '../index.css';
import OptionMenu from '../reactComponents/optionsMenu.js'
import Form from 'react-bootstrap/Form'
import SubmitButton from '../reactComponents/submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom' 

var loginset = require('../referenceVars/loginsettings.js')

class NextForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			timertime: 0,
			todotext: "To Do",
			units : "minutes"
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const timer = this.state.timertime;
		const todo = this.state.todotext;
		const unit = this.state.units
		this.props.submitFormCallback(timer, todo, unit);
	}

	handleFieldChange(event) {
		let key = event.target.name
		let val = event.target.value
		console.log('setting ' + key + ' to ' + val)
		this.setState({ [key]: val })
	}

	render() {
		return(
				<div>
					<Form id="nonameform" onSubmit={this.handleSubmit}>
						<Form.Group controlId="inputarea">
							<Form.Label>NEXT, I wanna complete</Form.Label>
						</Form.Group>
						<Form.Group>
							<Form.Control as="textarea" name="todotext" rows="3" onChange={this.handleFieldChange}/>
						</Form.Group>
						<Form.Group>
							<Form.Label>in</Form.Label>
						</Form.Group>
						<Form.Group>
							<Form.Control id="hours_val" type="text" name="timertime" placeholder="1" onChange={this.handleFieldChange}/>
							<OptionMenu menuname="units" changeevent={this.handleFieldChange}/>
						</Form.Group>
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="Set" />
						</Form.Group>					
					</Form>
				</div>
		) 
	}
}


export default withRouter(NextForm)