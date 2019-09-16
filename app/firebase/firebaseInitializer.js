import React, {	Component } from 'react'
import app from 'firebase/app'

var firebase = require('firebase');
var firebaseConfigComp = require('../referenceVars/firebaseConfig')
const firebaseConfig = firebaseConfigComp.firebaseConfig

export default class FirebaseInitializer{	
  constructor() {
    console.log(firebaseConfig)
    if(!firebase.apps.length) {
	     app.initializeApp(firebaseConfig);
    }
    console.log('contructor')
    this.auth = app.auth(); 
    this.loggedIn = false;     
	} 

  getUser() { 
    return this.auth.currentUser
  }

  signin(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signout() {
    console.log('signing out');
    this.auth.signOut(); 
  }

  async logout() {
    console.log('log out');
    return this.auth.signOut();
  }

  isUserLoggedIn() {
    return this.loggedIn
  }

  setLoggedIn(loggedIn) {
    console.log('setting loggedIn to ' + loggedIn);
    this.loggedIn = loggedIn
   }

}
