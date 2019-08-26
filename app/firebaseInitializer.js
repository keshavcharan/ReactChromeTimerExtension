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
    this.isLoggedIn = false        
	}

  registerAuthListener() {
    console.log("Registering Auth Listener : isLogged In " + this.isLoggedIn)
    return this.auth.onAuthStateChanged(user => {
        console.log("Listener called")
        if (user) { 
          console.log("Logged in as " + user.email)
          this.isLoggedIn=true
        } else {
          console.log("Not Authenticated")
          this.isLoggedIn=false
        }
    })
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
    return this.auth.signout()
  }

  isUserLoggedIn() {
    console.log("FirebaseInitializer isLoggedIn ? => " + this.isLoggedIn)
    return this.isLoggedIn
  }

  printuser() {
    console.log('printing user ')
    if(this.auth) {
      console.log('current user is ')
      console.log(this.auth.currentUser.email)  
    }
    
  }
}
