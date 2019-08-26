import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export default class SubmitButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var disablebutton = this.props.disable
		if(!disablebutton) {
			disablebutton = false
		}

		return (
			<ButtonToolbar>
				<Button variant="success" type="submit" disabled={disablebutton}> {this.props.label} </Button>
			</ButtonToolbar>
		)
	}

}