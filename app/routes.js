	import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AppHome from './apphome/appHome.js'
import LoginHome from './login/loginComponent.js'

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props);
		this.state = {	
			login_authenticated : false
		}
		this.authenticated = false
		this.reloadRoute = this.reloadRoute.bind(this)
	}

	componentWillMount() {
		var fb = this.props.firebaseComp
		console.log('component mounting')
		if(fb.isUserLoggedIn()) {
        	this.setState({ login_authenticated : true })
		} else {
        	this.setState({ login_authenticated : false })
		}
	}

	componentWillUnmount() {
		console.debug('unsubscribing');
		this.unsubscribe()
	}

	reloadRoute(logout) {
		console.log('reloading to / ' + logout);
		if (logout === true) {
        	this.setState({ login_authenticated : false })
		} else {
	        this.setState({ login_authenticated : true })
		}
	}

	render() {
		console.log('loading route : authenticated - ' + this.state.login_authenticated + ' for component - ' + this.props.type);
		const { type : type, ...rest } = this.props
		const authed = this.state.login_authenticated
		return (
			<Route {...rest} render = {
					(props) => (authed ? <AppHome {...props} reloadCallback={this.reloadRoute} firebaseComp={this.props.firebaseComp}/> : 
						<LoginHome {...props} reloadCallback={this.reloadRoute} firebaseComp={this.props.firebaseComp}/>)
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