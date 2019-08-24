import React, {	Component } from 'react'
import app from 'firebase/app'

var firebase = require('firebase');
var firebaseSonfigComp = require('./referenceVars/firebaseConfig')
const firebaseConfig = firebaseSonfigComp.firebaseConfig


export default class FirebaseInitializer extends React.Component{
	constructor(props) {
    super(props)
    console.log(firebaseConfig)
    if(!firebase.apps.length) {
	     app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();    
    this.signin=this.signin.bind(this)
	}


  signin(email, password){
      this.auth.signInWithEmailAndPassword(email, password).
      catch(function(error) {
              console.log("authentication error")
              var errorCode = error.code;
              var errorMessage = error.message;     
            }
          );
  }

  render() {
    return(null);
  }

}
