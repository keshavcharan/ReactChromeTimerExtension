import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Route } from 'react-router-dom'
import AppHome from './appHome.js'

class AppRoute extends React.Component {
	
	constructor(props) {
		super(props)
		this.firebaseComp = this.props.firebaseComp
	}

	componentDidMount() {	
		console.log("component mounted on app route" + this.firebaseComp)
		var loggedIn = this.firebaseComp.isUserLoggedIn()

		console.log("done calling userloggedIn on app route : user logged in " + loggedIn)

		if(loggedIn) {
			console.log("Mounting initial component - User Authenticated ")
		} else {
			console.log("Mounting initial component - User not Authenticated")
			this.props.history.push('/login')
		}		
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<AppHome firebaseComp={this.firebaseComp}/>			
		)
	}

}

export default withRouter(AppRoute)
