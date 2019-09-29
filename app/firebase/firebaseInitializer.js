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
    this.userdata = {
      last_start:0,
      current_timertime: 0
    }
	} 

  async initializeUserSetup(user, frompage) {
    const useruid=user.uid
    console.log("initializing " + useruid + ' ' + frompage)
    await this.db.collection('timer_users').doc(useruid).get().then(snapshot => {
      console.log(snapshot);
      if(snapshot.exists) {
        console.log('There is such document')
      } else {
        console.log('There is no such document')        
        let initdata = {
          last_start:0,
          current_timertime:0
        }
        this.db.collection('timer_users').doc(useruid).set(initdata)
      }
    }).catch(error => {
      console.log('Error getting document ' + error.code + ' ' + error.message)
    });

    console.log("initialized")
  }

  async login(email, password) {
      var currentuser;
      await this.auth.signInWithEmailAndPassword(email, password)
          .then((authuser) => {
            console.log("success")
            currentuser=authuser
          })
          .catch((error) => {console.log(error.code + " " + error.message)})
      if(currentuser) {
        //console.log("Login success " + JSON.stringify(currentuser))
        await this.initializeUserSetup(currentuser.user, "loginmethod")
      } else {
        console.log("authentication error " + currentuser)
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
