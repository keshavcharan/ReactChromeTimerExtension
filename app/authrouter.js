import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginRouter from './loginRouter.js'
import LogoutRouter from './logoutrouter.js'
import Authenticator from './authenticator.js'
import { FirebaseContext } from './firebaseInstance.js'
var loginset = require('./referenceVars/loginsettings.js')


class PrivateRoute extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			loaded : false,
			authenticated : false
		}
		this.firebaseComp = this.props.firebaseComp
	}

	componentDidMount() {	
		console.log("component mounted " + this.firebaseComp)		
		console.log(loginset.isLoggedIn)	

		if(loginset.isLoggedIn == "true") {
			this.setState ({loaded : true, authenticated : true})
		} else {
			this.props.history.push('/auth')
		}

		this.unlisten = this.props.history.listen(() => {			
			if(loginset.isLoggedIn == "false") {
				this.setState ({loaded : false, authenticated : false})
			} 			
		});
	}

	componentWillUnmount() {
		this.unlisten()
	}

	render() {
		const { component : Component, ...rest } = this.props
		const { loaded, authenticated } = this.state
		console.log('rendering' + loaded + authenticated)
		if(!loaded)	return null
		
		return (
			<Route {...rest} render = {
					(props) => (authenticated ==true ? (<Component {...props} />) : (<Redirect to='/auth'/>) )
				} />			
		)
	}

}


PrivateRoute=withRouter(PrivateRoute)

class Routes extends React.Component {
	constructor(props) {
		super(props)		
	}
	render() {
		return (
			<Router>
				<div>
				<Switch>
					<Route path='/auth' render={(props) => <Authenticator firebaseComp={this.props.firebaseClass}/>} />				
						<PrivateRoute firebaseComp={this.props.firebaseClass} path='/logout' component={LogoutRouter}/>
						<PrivateRoute firebaseComp={this.props.firebaseClass} path='/' component={LoginRouter}/>	
				</Switch>
				</div>
			</Router>
		)
	}
}
export default Routes