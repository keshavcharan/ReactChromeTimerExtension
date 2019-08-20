import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubmitButton from './reactComponents/submitbutton.js'

var loginset = require('./referenceVars/loginsettings.js')

class LogoutRouter extends React.Component {
	
	constructor(props) {
		super()
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(event) {
		event.preventDefault()
		console.log("Handle logout")
		loginset.isLoggedIn="false"
		this.props.history.push('/auth')		
	}

	render() {
		var loggedIn = loginset.isLoggedIn
		console.log('login router - loggedIn ' + loggedIn)
		return(
			<div>
				<div>					
					<Form id="logoutform" onSubmit={this.handleLogout}>
						<Form.Group sm={{ span: 10, offset: 2}}>
							<SubmitButton label="Logout" />
						</Form.Group>					
					</Form>
				</div>
			</div>
		)
	}
}

export default withRouter(LogoutRouter)