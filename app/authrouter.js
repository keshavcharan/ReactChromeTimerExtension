import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginRouter from './loginRouter.js'

var loginset = require('./referenceVars/loginsettings.js')

class AuthRouter extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		var renderauth=this.props.renderauth
		if(renderauth != "true") {
			renderauth = "false"
		}
		console.log('auth router ' + renderauth)		
		return(
			<div>
				<LoginRouter renderauthrouter={renderauth}/>				
			</div>
		)
	}
}


export default withRouter(AuthRouter)