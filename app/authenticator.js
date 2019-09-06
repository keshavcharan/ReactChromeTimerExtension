import React, { Component } from 'react'
import './index.css';
import Form from 'react-bootstrap/Form'
import SubmitButton from './reactComponents/submitbutton.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import FirebaseInitializer from './firebaseInitializer.js'

class Authenticator extends React.Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {	username: "", password: "" }
		this.firebaseComp = this.props.firebaseComp
		this.onChange=this.onChange.bind(this)
	}

	componentDidMount() {	
		if(this.firebaseComp.isUserLoggedIn()) {
			console.log("User not present")
			const {	history } = this.props
			history.push('/')
		} 			
	}

	handleSubmit(event) {
		event.preventDefault();
		var email = this.state.username
		var password = this.state.password

		this.firebaseComp.signin(email, password).then(authUser => console.log("Login success " + authUser)).catch(error => {
              console.log("authentication error")
              var errorCode = error.code;
              var errorMessage = error.message;     
            }
      	);
				
		const {	history } = this.props
		history.push('/')
	}

	onChange(event) {
		var key = event.target.name
		var value = event.target.value
		this.setState({	[key] : value })
	}

	render() {
		var username = this.state.username
		var password = this.state.password
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
						</Form.Group>		
						<br/>
						<br/>
						<Link to="/signup">New User - Sign Up</Link>						
					</Form>
				</div>
		) 
	}

}

export default withRouter(Authenticator)