import React, {Component} from 'react'
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export default class ImageButton extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		var disablebutton = this.props.disable
		if(!disablebutton) {
			disablebutton = false
		}

		const styles = {
			img_sm : {	
			    height: 30,
			    width: 30,
			    float: 'right'
			}
		} 

		return (
				<input src="logout.png" style={styles.img_sm} type="image" alt="submit" disabled={disablebutton}/>
		)
	}

}