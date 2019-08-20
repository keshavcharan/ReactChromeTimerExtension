import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class LoginRouter extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		return(
			<div>
				Home
				<Link to="/logout"> Logout </Link>
			</div>
		)
	}
}

export default withRouter(LoginRouter)