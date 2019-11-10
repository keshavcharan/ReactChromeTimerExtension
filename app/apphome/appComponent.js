import React, {Component} from 'react'
import NextForm from './nextform.js'
import ProgressTimer from '../reactComponents/progressTimer.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//var params = require('../referenceVars/paramsset.js');
//var dbparams
//var params = require('../referenceVars/paramsset.js');

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dummy: false
		}
		
		this.onFormSubmit= this.onFormSubmit.bind(this);
		this.backToForm = this.backToForm.bind(this);
		this.firebaseComp=this.props.firebaseComp;
		this.resetdummy=this.resetdummy.bind(this);
		this.db = this.firebaseComp.db;
		this.user = this.firebaseComp.getUser();
		this.userdata = this.firebaseComp.getuserdata()
		this.starttimer = false
		console.log("loading db params from App Component " + JSON.stringify(this.userdata))

	//	console.log('user data ' + this.user.uid + usersnapshot.email + " " + usersnapshot.isTaskActive);
	}

	async onFormSubmit(timerval, todotext, units) {
		console.log("setting params");
		var currenttime = parseInt(new Date().getTime()/1000)
		console.log("current time " + currenttime + ' ' + units)
		let timerdata = {
          last_start:currenttime,
          current_timertime:(units === "Hours") ? timerval*60 : timerval*3600,
          current_task:todotext
        }

		await this.firebaseComp.addToDb(timerdata, this.user.uid,"timer_users")
		this.starttimer = true
		this.resetdummy()
	}

	resetdummy() {
		let newval = !this.state.dummy;
		this.setState({dummy: newval});
	}

	async backToForm() {
		let initdata = {
          last_start:0,
          current_timertime:0,
          current_task:""
        }
        this.starttimer = false
        await this.firebaseComp.addToDb(initdata, this.user.uid,"timer_users")
		this.resetdummy()
	}

	componentWillUpdate() {
		console.log('component will update')
		this.userdata = this.firebaseComp.getuserdata()
		console.log("Component updated : dbparams are " + JSON.stringify(this.userdata))
	}

	render() {
		var userparams = this.userdata
		let renderform;
		console.log('rechecking user data ' + JSON.stringify(this.userdata))
		if(this.starttimer === true) {
			this.starttimer = false
			renderform = <ProgressTimer timerCallback={this.backToForm} taskname={userparams.current_task} starttime={userparams.last_start} times={userparams.current_timertime}/>
		} else {
			var now = parseInt(new Date().getTime()/1000)
			let inprogress = false;
			if (userparams.last_start > 0) {
				const window = now - userparams.last_start
				if (window > 0 && window <= userparams.current_timertime) {
					inprogress = true
				} else {
					this.backToForm()
				}
			} 

			if(inprogress === true) {
				renderform = <ProgressTimer timerCallback={this.backToForm} taskname={userparams.current_task} starttime={userparams.last_start} times={userparams.current_timertime}/>
			} else {
				renderform = <NextForm submitFormCallback={this.onFormSubmit}/>
			}
		}
		
		return(
			<div>
				{renderform}
			</div>
		)
	}
}

export default withRouter(AppComponent)