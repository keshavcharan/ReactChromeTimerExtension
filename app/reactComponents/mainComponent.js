import React, { Component } from 'react'
import RouterComponent from './routerComponent.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class MainComponent extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		return(
			<div>
				<RouterComponent/>
				<Link to='/timr'> Timer </Link>
			</div>
		)
	}
}

export default withRouter(MainComponent)