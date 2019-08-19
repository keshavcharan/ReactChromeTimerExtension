import React, { Component } from 'react'
import './index.css';
import Form from 'react-bootstrap/Form'
import SubmitButton from './reactComponents/submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckSession from './checksession.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

var loginset = require('./referenceVars/loginsettings.js')

class LoginForm extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("setting log")
		loginset.isLoggedIn = "true"
		this.props.history.push('/auth')
	}

	render() {
		console.log('login form')
		return(
				<div>					
					<Form id="loginform" onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Control id="login" type="text" placeholder="Username"/>
						</Form.Group>
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="Login" />
						</Form.Group>					
					</Form>
				</div>
		) 
	}

}

export default withRouter(LoginForm)