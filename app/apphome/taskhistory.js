import React, {Component} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

class TaskHistory extends React.Component {
	
	constructor(props) {
		super(props)	
		this.firebaseComp=this.props.firebaseComp
		this.createlistitems = this.createlistitems.bind(this)
	}
	
	createlistitems(useritems) {
		var listitems = [];
		for(var i = 0; i < useritems.length; i++) {
			var item = useritems[i]
			listitems.push(<ListGroup.Item>{item.task}</ListGroup.Item>)
		}
		return listitems
	}

	render() {
		var useritems = this.firebaseComp.getuserdata().historical_data
		return (
			<ListGroup>
				{this.createlistitems(useritems)}
			</ListGroup>
		)
	}
}

export default TaskHistory