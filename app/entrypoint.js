import Routes from './routes.js'
import  { FirebaseContext } from './firebaseInstance.js';
import React from 'react'


export default class EntryPoint extends React.Component {

	constructor(props){
		super(props)
	}
	render() {
	    console.log('in entrypoint.js');
		return (
		    <Routes firebaseClass={this.props.firebaseclass}/>
		)
	}
}
