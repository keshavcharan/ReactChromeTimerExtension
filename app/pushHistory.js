import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


class PushHistory extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('pushing to /');
		this.props.history.push('/')
	}

	render() {
		return (null)
	}
}

export default withRouter(PushHistory)