import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginForm from './loginform.js'
import AppComponent from './reactComponents/appComponent.js'
import AuthRouter from './authrouter.js'
import EntryPoint from './entrypoint.js'

var loginset = require('./referenceVars/loginsettings.js')

class LoginRouter extends React.Component {
	
	constructor(props) {
		super()
		this.renderar = this.renderar.bind(this)
	}

	renderar() {
		var renderauthrouter=this.props.renderauthrouter
		console.log('renderauthrouter ' + renderauthrouter)
		var rep = 'false'
		if(renderauthrouter == "true") {
			return <Route path="/auth" render={() => <AuthRouter renderauth={rep}/>} />
		} else {
			return <Route path="/auth" render={() => <Redirect to='/'/> } />
		}

	}
	render() {
		var loggedIn = loginset.isLoggedIn
		console.log('login router - loggedIn ' + loggedIn)
		return(
			<div>
			<Router>				
				{this.renderar()}
				<Route path="/login" component={LoginForm} />
				<Route exact path="/" render={() => 
						loggedIn == "false" ? 
							<Redirect to='/login'/> : 
							<AppComponent />
				}/>
			</Router>
			</div>
		)
	}
}

export default withRouter(LoginRouter)