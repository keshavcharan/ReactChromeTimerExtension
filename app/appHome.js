import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import AppComponent from './reactComponents/appComponent.js'
import Header from './header.js'

class AppHome extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		console.log("rendering")
		return(
			<div>
				<Header firebaseComp={this.props.firebaseComp}/>
				<AppComponent/>
			</div>
		)
	}
}

export default withRouter(AppHome)