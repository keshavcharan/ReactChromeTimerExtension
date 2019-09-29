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

class SignUp extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.firebaseComp = this.props.firebaseComp
		this.logincallbackmethod=this.props.logincallback
		this.onChange=this.onChange.bind(this)		
		this.onloginclick = this.onloginclick.bind(this)
		this.state = {	email: "", password: "" , retype : "", nickname : "" }		
	}

	async handleSubmit(event) {
		event.preventDefault();		
		var email = this.state.email
		email = email.toString().trim();			
		var password = this.state.password

		let useradded;
		console.log("authentication with " + email + ' ' + password)
		await this.firebaseComp.signup(email, password).then(authUser => {
			console.log("Signup success")
			this.firebaseComp.signout()
			this.onloginclick()
		}).catch(error => {              
              var errorCode = error.code;
              var errorMessage = error.message;     
              console.log("authentication error " + errorCode + " " + errorMessage)
            }
      	);
      	console.log("there is user")
	}


	onChange(event) {		
		var key = event.target.name
		var value = event.target.value
		this.setState({	[key] : value })
	}

	onloginclick() {
		this.logincallbackmethod("login")
	}

	render() {
		var password = this.state.password
		var retype = this.state.retype
		var email = this.state.email
		var nickname = this.state.nickname

		const invalid = password !== retype || password === "" || email === "" || nickname === ""		

		console.log(invalid + ' ' + password + ' ' + retype + ' ' + email + ' ' + nickname)
		return (
				<div>						
					<Form id="signup_form" onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Label column sm={6}> Email </Form.Label>
							<Form.Control id="email" name="email" type="text" placeholder="Email" onChange={this.onChange}/>
						</Form.Group>			
						<Form.Group>
							<Form.Label column sm={6}> Nickname </Form.Label>						
							<Form.Control id="nickname" name="nickname" password="{nickname}" type="text" placeholder="Nickname" onChange={this.onChange}/>
						</Form.Group>
						<Form.Group>
							<Form.Label column sm={6}> Password </Form.Label>												
							<Form.Control id="password" name="password" password="{password}" type="password" placeholder="Password" onChange={this.onChange}/>
						</Form.Group>												
						<Form.Group>
							<Form.Label column sm={6}> Re-enter Password </Form.Label>												
							<Form.Control id="retype" name="retype" password="{retype}" type="password" onChange={this.onChange}/>
						</Form.Group>																		
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="SignUp" disable={invalid} />
						</Form.Group>	
						<Form.Group>
							<Button variant="link" onClick={this.onloginclick}>Back to Login</Button>
						</Form.Group>										
					</Form>
				</div>
		) 
	}

}

export default withRouter(SignUp)