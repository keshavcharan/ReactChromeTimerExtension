import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import LoginRouter from './loginRouter.js'
import LogoutRouter from './logoutrouter.js'
import Authenticator from './authenticator.js'

var loginset = require('./referenceVars/loginsettings.js')

class PrivateRoute extends React.Component {
	
	constructor(props) {
		super()
		this.state = {
			loaded : false,
			authenticated : false
		}
	}

	componentDidMount() {		
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
		if(!loaded)	return null
		
		return (
			<Route {...rest} render = {
				(props) => (authenticated ==true ? (<Component {...props} />) : (<Redirect to='/auth'/>) )
			} />
		)
	}

}


PrivateRoute=withRouter(PrivateRoute)

const Routes = () => (
	<Router>
		<div>
		<Switch>
			<Route path='/auth' component={Authenticator}/>
			<PrivateRoute path='/logout' component={LogoutRouter}/>			
			<PrivateRoute path='/' component={LoginRouter}/>			
		</Switch>
		</div>
	</Router>
)

export default Routes