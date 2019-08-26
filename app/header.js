import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LogoutRouter from './logoutrouter.js'
import  { FirebaseContext } from './firebaseInstance.js';

class Header extends React.Component {
	
	constructor(props) {
		super(props)

	}

	render() {
		return(
			<div>
			  <FirebaseContext.Consumer>
			    {firebase => {
			      <LogoutRouter firebaseComp={firebase}/>
			    }}
			  </FirebaseContext.Consumer>
			</div>
		)
	}
}

export default withRouter(Header)