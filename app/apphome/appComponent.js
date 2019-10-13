import React, {Component} from 'react'
import NextForm from './nextform.js'
import ProgressTimer from '../reactComponents/progressTimer.js'
import { withRouter } from 'react-router-dom' 
import { Redirect } from 'react-router' 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//var params = require('../referenceVars/paramsset.js');
//var dbparams
var params = require('../referenceVars/paramsset.js');

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dummy: 0
		}
		
		this.onFormSubmit= this.onFormSubmit.bind(this);
		this.backToForm = this.backToForm.bind(this);
		this.firebaseComp=this.props.firebaseComp;
		this.db = this.firebaseComp.db;
		this.user = this.firebaseComp.getUser();
		this.dbparams1 = this.firebaseComp.getuserdata()

		console.log("loading db params from App Component " + JSON.stringify(this.dbparams1))

	//	console.log('user data ' + this.user.uid + usersnapshot.email + " " + usersnapshot.isTaskActive);
	}

	async onFormSubmit(timerval, todotext) {
		console.log("setting params");
		params.inprogress = "true";	
		params.timertimes.currentStartTime=new Date().getTime()/1000;
		params.timertimes.currentTimeSet=timerval*6;

		let timerdata = {
          last_start:params.timertimes.currentStartTime,
          current_timertime:timerval,
          current_task:todotext
        }

		await this.firebaseComp.addToDb(timerdata, this.user.uid,"timer_users")
		let newval = this.state.dummy;
		this.setState({dummy: newval+1});
	}

	async backToForm() {
		params.inprogress = "false";	
		params.timertimes.currentStartTime=new Date().getTime()/1000;
		params.timertimes.currentTimeSet=0;

		let initdata = {
          last_start:0,
          current_timertime:0,
          current_task:""
        }
        await this.firebaseComp.addToDb(initdata, this.user.uid,"timer_users")

		let newval = this.state.dummy;
		this.setState({dummy: newval-1});	
	}

	componentWillUpdate() {
		console.log('component will update')
/*		await this.firebaseComp.loaduserdata().then(() => {
			console.log("loading user data")
			this.dbparams1 = this.firebaseComp.getuserdata();
		});
*/		this.dbparams1 = this.firebaseComp.getuserdata();
		console.log("Component updated : dbparams are " + JSON.stringify(this.dbparams1))
	}

	render() {
		let renderform;

		var now = parseInt(new Date().getTime()/1000)
		var dbparams = this.dbparams1
		const inprogress = (dbparams.last_start > 0) && (dbparams.last_start > now)
		
		console.log('@@@@@ ' + now + ' ' + inprogress + ' ' + dbparams.last_start + ' ' + dbparams.current_task)
		if(params.inprogress == "true") {
			renderform = <ProgressTimer timerCallback={this.backToForm} starttime={params.timertimes.currentStartTime} times={params.timertimes.currentTimeSet}/>;
		} else {
			renderform = <NextForm submitFormCallback={this.onFormSubmit}/>;
		}

		return(
			<div>
				{renderform}
			</div>
		)
	}
}

export default withRouter(AppComponent)