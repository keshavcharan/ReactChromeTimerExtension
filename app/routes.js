import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppRoute from './appRoute.js'
import LoginRoute from './loginRoute.js'
import AppHome from './appHome.js'
import LoginPage from './loginPageTest.js'

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			authenticated : false
		}
	}

	componentDidMount() {
		console.log('registering a listener ' + this.props.type)
		var fb = this.props.firebaseComp

		if(fb.isUserLoggedIn()) {
			this.setState({ authenticated : true })
		} else {
			this.setState({ authenticated : false })
		}

    	this.unsubscribe = fb.auth.onAuthStateChanged(user => {
	        console.log("Listener called in routes")
	        if (user) { 
	        	fb.setLoggedIn(true)
	        	this.setState({ authenticated : true })
	          	console.log("Logged in as " + user.email)
	        } else {
	        	fb.setLoggedIn(false)
	        	this.setState({ authenticated : false })
	          	console.log("Not Authenticated")
	        }
        	this.props.history.push('/')
	    	console.log("Init exit : rendering entry point");
    	});
	}

	componentWillUnmount() {
		console.log('unsubscribing');
		this.unsubscribe()
	}

	render() {
		console.log('loading route ' + this.state.authenticated + ' for ' + this.props.type);
		const { type : type, ...rest } = this.props
		const authed = this.state.authenticated
		return (
			<Route {...rest} render = {
					(props) => (authed ? <AppHome {...props} firebaseComp={this.props.firebaseComp}/> : 
						<LoginPage {...props} firebaseComp={this.props.firebaseComp}/>)
				} />			
		)
	}
}

PrivateRoute=withRouter(PrivateRoute)

class Routes extends React.Component {
	constructor(props) {
		super(props)		
		this.state = {
			dummy : false
		};
	}

	render() {
		console.log('Creating routes')
		return (
			<div>
			<Router>
				<div>
				<Switch>
					<PrivateRoute path='/login' type="login" firebaseComp={this.props.firebaseClass}/>
					<PrivateRoute path='/' type="app" firebaseComp={this.props.firebaseClass}/>	
				</Switch>
				</div>
			</Router>
			</div>
		)
	}
}

export default Routes