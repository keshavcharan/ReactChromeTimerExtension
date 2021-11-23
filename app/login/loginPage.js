import React, { Component } from 'react'
import '../index.css';
import Form from 'react-bootstrap/Form'
import SubmitButton from '../reactComponents/submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FirebaseInitializer from '../firebase/firebaseInitializer.js'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

class LoginPage extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {	username: "", password: "", loginfail: false }
		this.firebaseComp = this.props.firebaseComp
		this.logincallbackmethod=this.props.logincallback
		this.database = this.firebaseComp.db
		this.onChange=this.onChange.bind(this)
		this.signup = this.signup.bind(this)		
	}

	componentDidMount() {	
		console.log('login page mounted')

	}

	onChange(event) {
		var key = event.target.name
		var value = event.target.value
		this.setState({	[key] : value })
	}

	async handleSubmit(event) {
		event.preventDefault();
		var email = this.state.username
		var password = this.state.password

		console.log('logging in')
		await this.firebaseComp.login(email, password).then((success) => {
			if(success) {
				this.props.reloadCallback(false)			
				this.setState({loginfail: false})
			} else {
				this.setState({loginfail: true})
			}
		}); 
		console.log('logged in')
	}

	signup() {
		console.log("signing up")
		this.logincallbackmethod("signup")
	}

	render() {
		var username = this.state.username
		var password = this.state.password
		var loginfail = this.state.loginfail
		const invalid = username === "" || password === ""
		return (
				<div>	
					<Form id="loginform" onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Control id="login" name="username" type="text" placeholder="Username" onChange={this.onChange}/>
						</Form.Group>
						<Form.Group>
							<Form.Control id="pswd" name="password" type="password" placeholder="Password" onChange={this.onChange}/>
						</Form.Group>		
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="Login" disable={invalid}/>
							<Alert dismissable="false" variant="danger" show={loginfail}>
								Invalid email/password combination
							</Alert>
						</Form.Group>		
						<Form.Group>
							<Button variant="link" onClick={this.signup}>New User - Signup</Button>
						</Form.Group>
					</Form>
				</div>
		) 
	}

}

export default withRouter(LoginPage)