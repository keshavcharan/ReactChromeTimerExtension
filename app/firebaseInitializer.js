import React, {	Component } from 'react'
import app from 'firebase/app'

var firebase = require('firebase');
var firebaseConfigComp = require('./referenceVars/firebaseConfig')
const firebaseConfig = firebaseConfigComp.firebaseConfig


export default class FirebaseInitializer{	
  constructor() {
    console.log(firebaseConfig)
    if(!firebase.apps.length) {
	     app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();        
	}

  signin(email, password) {
      return this.auth.signInWithEmailAndPassword(email, password);
  }

  printuser() {
    console.log('printing user ')
    if(this.auth) {
      console.log('current user is ')
      console.log(this.auth.currentUser.email)  
    }
    
  }
}
