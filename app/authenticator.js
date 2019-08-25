import React, { Component } from 'react'
import './index.css';
import Form from 'react-bootstrap/Form'
import SubmitButton from './reactComponents/submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FirebaseInitializer from './firebaseInitializer.js'
var loginset = require('./referenceVars/loginsettings.js')

class Authenticator extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {	username: "", password: "" }
		this.firebaseComp = this.props.firebaseComp
		this.setUsername=this.setUsername.bind(this)
		this.setPassword=this.setPassword.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		var email = this.state.username
		var password = this.state.password

		console.log("xxxxxx " + email + ' ' + password + ' ' + this.firebaseComp)
		this.firebaseComp.signin(email, password).then(authUser => console.log("Login success " + authUser)).catch(error => {
              console.log("authentication error")
              var errorCode = error.code;
              var errorMessage = error.message;     
            }
      	);
		
		loginset.isLoggedIn = "true"
		const {	history } = this.props
		history.push('/')
	}

	setUsername(event) {
		console.log('yyyyy')
		this.setState({	username : event.target.value })
	}

	setPassword(event) {
		console.log('yyyyy')
		this.setState({	password : event.target.value })
	}

	render() {
		console.log('Authenticator')
		return (
				<div>	
					<Form id="loginform" onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Control id="login" type="text" placeholder="Username" onChange={this.setUsername}/>
						</Form.Group>
						<Form.Group>
							<Form.Control id="pswd" type="password" placeholder="Password" onChange={this.setPassword}/>
						</Form.Group>						
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="Login" />
						</Form.Group>					
					</Form>
				</div>
		) 
	}

}

export default withRouter(Authenticator)