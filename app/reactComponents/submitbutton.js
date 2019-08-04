import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export default class SubmitButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ButtonToolbar>
				<Button variant="success" type="submit"> {this.props.label} </Button>
			</ButtonToolbar>
		)
	}

}