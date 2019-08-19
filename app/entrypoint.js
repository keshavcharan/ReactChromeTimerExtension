import React, { Component } from 'react'
import AppComponent from './reactComponents/appComponent.js'
import EntryAuthRouter from './entryauthrouter.js'

var loginset = require('./referenceVars/loginsettings.js')
import { BrowserRouter } from 'react-router-dom';

export default class EntryPoint extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		const loggedIn = loginset.isLoggedIn;
		console.log('entry point')
		return(
			<BrowserRouter>
				<EntryAuthRouter/>							
			</BrowserRouter>
		)
	}
}