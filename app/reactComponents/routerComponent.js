import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AppComponent from './appComponent.js'
import HomeComponent from './homeComponent.js'

export default class RouterComponent extends React.Component {
	
	constructor(props) {
		super()
	}
	
	render() {
		return(
			<Router>
				<Route exact path="/" component={AppComponent} />
				<Route path="/timr/" component={HomeComponent} />
			</Router>
		)
	}
} 