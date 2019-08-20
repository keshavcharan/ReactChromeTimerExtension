import React, { Component } from 'react'
import AppComponent from './reactComponents/appComponent.js'
import AuthRouter from './authrouter.js'

import { BrowserRouter } from 'react-router-dom';

export default class EntryPoint extends React.Component {
	
	constructor(props) {
		super()
	}

	render() {
		return (
			<div>
				<AuthRouter/>							
			</div>
		);
	}
}