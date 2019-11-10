import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LogoutRouter from './logoutrouter.js'
import  { FirebaseContext } from '../firebase/firebaseInstance.js';

class Header extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {
		return(
			<div>
		      	<LogoutRouter firebaseComp={this.props.firebaseComp} reloadCallback={this.props.reloadCallback}/>
			</div>
		)
	}
}

export default withRouter(Header)