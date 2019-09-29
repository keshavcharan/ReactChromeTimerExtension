import React, {	Component } from 'react'
import loginparams from '../login/loginPage.js'
import SignUp from './signup.js'
import Login from './loginPage.js'
import { withRouter } from 'react-router-dom' 

class LoginComponent extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dummy: 0
		}
		this.navigatetopage="login"
		this.topage=this.topage.bind(this)	
	}

	topage(page) {
		console.log("setting state")
		this.navigatetopage=page
		let dummyvar = this.state.dummy
		this.setState({dummy : dummyvar +1})
	}

	render() {
		let renderpage;
		if(this.navigatetopage == "login") {
			renderpage = <Login firebaseComp={this.props.firebaseComp} logincallback={this.topage}/>
		} else if(this.navigatetopage == "signup") {
			renderpage = <SignUp firebaseComp={this.props.firebaseComp} logincallback={this.topage}/>
		} else {
			renderpage = <Login firebaseComp={this.props.firebaseComp} logincallback={this.topage}/>
		}
		
		return(
			<div>
				{renderpage}
			</div>
		)
	}
}

export default withRouter(LoginComponent)