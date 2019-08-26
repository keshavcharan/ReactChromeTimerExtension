import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import SubmitButton from './reactComponents/submitbutton.js'

class LogoutRouter extends React.Component {
	
	constructor(props) {
		super(props)
		this.handleLogout = this.handleLogout.bind(this);
		this.firebaseComp = this.props.firebaseComp		
	}

	handleLogout(event) {
		event.preventDefault()
		console.log("Handle logout " + this.firebaseComp)
		this.firebaseComp.logout().
				then(console.log("Logout success")).
				catch(error => console.log("Logout Failed " + error.code + " " + error.message))				
		this.props.history.push('/')		
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