import React, {	Component } from 'react'
import app from 'firebase/app'

var firebase = require('firebase');
var firebaseConfigComp = require('../referenceVars/firebaseConfig')
const firebaseConfig = firebaseConfigComp.firebaseConfig

export default class FirebaseInitializer{	
  constructor(data) {
    // This class is not just for Firebase but it will have auth, db modules defined inside one class
    // Tomorrow if db changes we will include the config for db in this class itself
    if(!firebase.apps.length) {
	     app.initializeApp(firebaseConfig);
    }

    this.auth = app.auth(); 
    this.db = app.firestore();
    this.loggedIn = false;     
    this.userdata = {
      last_start:0,
      current_timertime: 0,
      current_task: ""
    }
	} 

  async initializeUserSetup(user, frompage) {
    const useruid=user.uid
    console.log("initializing " + useruid + ' from ' + frompage)
    let snapshot = await this.db.collection('timer_users').doc(useruid).get()
    console.debug("snapshot loaded " + snapshot);
    if(snapshot.exists) {
        let initdata = snapshot.data()
        console.log('There is such document ' + JSON.stringify(initdata))
        this.userdata.last_start = initdata.last_start
        this.userdata.current_timertime = initdata.current_timertime
        this.userdata.current_task = initdata.current_task
      } else {
        console.log('There is no such document')
        let initdata = {
          last_start:0,
          current_timertime:0,
          current_task:""
        }
        this.userdata = initdata
        this.db.collection('timer_users').doc(useruid).set(initdata)
      }
      console.log("initialized with user data " + JSON.stringify(this.userdata))
  }

  async addToDb(dataObject, documentid, collection) {
      console.debug("adding dataObject to db " + JSON.stringify(dataObject))
      await this.db.collection(collection).doc(documentid).set(dataObject).then(ref => {
        console.log("document added ") 
        this.userdata = dataObject
      }).catch(error => {
        console.log("Error adding document " + error.code + " " + error.message)
      })
      console.debug("added dataObject to db ")      
  }

  async login(email, password) {
      var currentuser;
      await this.auth.signInWithEmailAndPassword(email, password)
          .then((authuser) => {
            console.log("login success")
            currentuser=authuser
          })
          .catch((error) => {console.log("login failed " + error.code + " " + error.message)})
      if(currentuser) {
        //console.log("Login success " + JSON.stringify(currentuser))
        await this.initializeUserSetup(currentuser.user, "loginmethod")
      } else {
        console.log("authentication error " + currentuser)
      }      
  }

  getuserdata(reload) {
    return this.userdata
  }

  async loaduserdata() {
    console.log("test2")
    let snapshot = await this.db.collection('timer_users').doc(this.getUser().uid).get()
    console.debug("snapshot reloaded " + snapshot);
    if(snapshot.exists) {
        let initdata = snapshot.data()
        console.log('Current values are ' + JSON.stringify(initdata))
        this.userdata.last_start = initdata.last_start
        this.userdata.current_timertime = initdata.current_timertime
        this.userdata.current_task = initdata.current_task
      } 
      console.log("test3 " + JSON.stringify(this.userdata))
  }

  getUser() { 
    return this.auth.currentUser
  }

  signup(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  async signout() {
    console.log('signing out');
    await this.auth.signOut(); 
  }

  isUserLoggedIn() {
    console.log('user logged in ' + this.loggedIn)
    return this.loggedIn
  }

  setLoggedIn(loggedIn) {
    console.log('setting loggedIn to ' + loggedIn);
    this.loggedIn = loggedIn
  }

}
