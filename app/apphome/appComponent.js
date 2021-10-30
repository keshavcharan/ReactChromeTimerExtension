import React, {Component} from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TimerComponent from './timerComponent'
import TaskHistory from './taskhistory'

class AppComponent extends React.Component {

	constructor(props) {
		super(props)
		this.refreshTab=this.refreshTab.bind(this)	
		this.state = {
			tabkey : "timer"
		}
	}
	
	refreshTab(key) {
		this.setState({tabkey : key})
	}

	render() {
		return (
			<Tabs id="apptabs" activeKey={this.state.tabkey} onSelect={this.refreshTab}>
				<Tab eventKey="timer" title="Timer">
					<TimerComponent firebaseComp={this.props.firebaseComp} />
				</Tab>
				<Tab eventKey="history" title="History">
					<TaskHistory firebaseComp={this.props.firebaseComp}	/>
				</Tab>
			</Tabs>
		)
	}
}

export default AppComponent