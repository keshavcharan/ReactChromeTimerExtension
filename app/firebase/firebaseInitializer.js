import React, {	Component } from 'react'
import app from 'firebase/app'

var firebase = require('firebase');
var firebaseConfigComp = require('../referenceVars/firebaseConfig')
const firebaseConfig = firebaseConfigComp.firebaseConfig

export default class FirebaseInitializer{	
  constructor(data) {

    // This class is not just for Firebase but it will have auth, db modules defined inside one class
    // Tomorrow if db changes we will include the config for db in this class itself
    console.log(firebaseConfig)
    if(!firebase.apps.length) {
	     app.initializeApp(firebaseConfig);
    }
    console.log('constructor')

    this.auth = app.auth(); 
    this.db = app.firestore();
    this.loggedIn = false;     
	} 

  async initializeUserSetup(user) {
    const useruid=user.uid
    console.log("initializing")
    var doc = await this.db.collection('users').doc(user.uid).get();  
    if (!doc) {
      console.log('No such document!');
      // create a document here

    } else {
      // update the document here
      console.log('Document data:', doc.data());
    }  
    
    console.log("initialized")
  }

  async login(email, password) {
      var authUser = await this.auth.signInWithEmailAndPassword(email, password);
      if(authUser) {
        //initializeUserSetup(authUser)
        console.log("Login success " + authUser)
      } else {
        console.log("authentication error")
      }
  }

  getDb() {
    return this.db;
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
