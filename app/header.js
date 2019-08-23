import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LogoutRouter from './logoutrouter.js'

class Header extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		return(
			<div>
				<LogoutRouter/>
			</div>
		)
	}
}

export default withRouter(Header)