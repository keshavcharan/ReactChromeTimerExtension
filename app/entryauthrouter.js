import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginRouter from './loginRouter.js'

var loginset = require('./referenceVars/loginsettings.js')

class EntryAuthRouter extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {	
		return(
			<div>
				<LoginRouter renderauthrouter="true"/>				
			</div>
		)
	}
}


export default withRouter(EntryAuthRouter)