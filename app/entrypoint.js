import Routes from './routes.js'
import  { FirebaseContext } from './firebase/firebaseInstance.js';
import React from 'react'


export default class EntryPoint extends React.Component {

	constructor(props){
		super(props)
	}
	
	render() {
	    console.debug('in entrypoint.js');
		return (
		    <Routes firebaseClass={this.props.firebaseclass}/>
		)
	}
}
