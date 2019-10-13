import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubmitButton from '../reactComponents/submitbutton.js'

class LogoutRouter extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleLogout = this.handleLogout.bind(this);
		this.firebaseComp = this.props.firebaseComp		
	}

	handleLogout(event) {
		event.preventDefault()
		this.firebaseComp.signout()				
	}

	render() {
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