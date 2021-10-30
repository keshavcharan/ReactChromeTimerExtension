import React, {Component} from 'react'
import NextForm from './nextform.js'
import ProgressTimer from '../reactComponents/progressTimer.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//var params = require('../referenceVars/paramsset.js');
//var dbparams
//var params = require('../referenceVars/paramsset.js');

class TimerComponent extends React.Component {
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

	}

	async onFormSubmit(timerval, todotext, units) {
		console.log("setting params");
		var currenttime = parseInt(new Date().getTime()/1000)
		//var settime = (units === "Hours") ? timerval*3600 : timerval*60
		var settime = timerval*3
		console.log("current time " + currenttime + ' ' + units)

		let timerdata = {
          last_start:currenttime,
          current_timertime:settime,
          current_task:todotext
        }

        let dbObj = {
        	"collection" : {
        		"name" : "timer_users",
        		"document" : {
        			"name" : this.user.uid
        		}
        	}
        }

		await this.firebaseComp.addToDb(timerdata, dbObj, false)
		this.starttimer = true
		this.resetdummy()
	}

	resetdummy() {
		let newval = !this.state.dummy;
		this.setState({dummy: newval});
	}

	async backToForm(starttime, taskname, complete) {
		let initdata = {
          "last_start":0,
          "current_timertime":0,
          "current_task":""
        }

        let initObj = {
        	"collection" : {
        		"name" : "timer_users",
        		"document" : {
        			"name" : this.user.uid
        		}
        	}
        }

        let historyObj = {
        	"collection" : {
        		"name" : "timer_users",
        		"document" : {
        			"name" : this.user.uid,
        			"collection" : {
        				name : "history",
        				"document" : {
        					"name" : starttime
        				}
        			}
        		}
        	}
        }

        let historydata = {
        	"start" : starttime,
        	"task" : taskname,
        	"completed" : complete
        }

        this.starttimer = false
        await this.firebaseComp.addToDb(historydata, historyObj, false)
        await this.firebaseComp.addToDb(initdata, initObj, true)
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

export default withRouter(TimerComponent)