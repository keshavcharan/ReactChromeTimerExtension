	import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppHome from './apphome/appHome.js'
import LoginHome from './login/loginComponent.js'

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			authenticated : false
		}
	}

	componentWillMount() {
		var fb = this.props.firebaseComp

		if(fb.isUserLoggedIn()) {
			this.setState({ authenticated : true })
		} else {
			this.setState({ authenticated : false })
		}

    	this.unsubscribe = fb.auth.onAuthStateChanged(user => {
	        if (user) { 
	        	fb.setLoggedIn(true)
	        	this.setState({ authenticated : true })
	          	console.debug("Routes : Logged in as " + user.email)
	        } else {
	        	fb.setLoggedIn(false)
	        	this.setState({ authenticated : false })
	          	console.debug("Routes : Not Authenticated")
	        }
        	this.props.history.push('/')
    	});
	}

	componentWillUnmount() {
		console.debug('unsubscribing');
		this.unsubscribe()
	}

	render() {
		console.log('loading route : authenticated - ' + this.state.authenticated + ' for component - ' + this.props.type);
		const { type : type, ...rest } = this.props
		const authed = this.state.authenticated
		return (
			<Route {...rest} render = {
					(props) => (authed ? <AppHome {...props} firebaseComp={this.props.firebaseComp}/> : 
						<LoginHome {...props} firebaseComp={this.props.firebaseComp}/>)
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