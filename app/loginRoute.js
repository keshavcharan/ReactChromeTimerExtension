import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Route } from 'react-router-dom'
import LoginPage from './loginPageTest.js'

class LoginRoute extends React.Component {
	
	constructor(props) {
		super(props)
		this.firebaseComp = this.props.firebaseComp
	}

	componentDidMount() {	
		console.log("component mounted on login route " + this.firebaseComp)
		var loggedIn = this.firebaseComp.isUserLoggedIn()

		console.log("done calling userloggedIn on login route")
		if(loggedIn) {
			console.log("Mounting initial component - User Authenticated ")
			this.props.history.push('/')
		} else {
			console.log("Mounting initial component - User not Authenticated")
		}
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<LoginPage firebaseComp={this.firebaseComp}/>			
		)
	}

}

export default withRouter(LoginRoute)