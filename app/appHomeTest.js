import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AppComponent from './reactComponents/appComponent.js'
import Header from './header.js'

class AppHomePage extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		console.log("rendering")
		return(
			<div>
				<div>
					Loading AppHomePage
				</div>
			</div>
		)
	}
}

export default withRouter(AppHomePage) 