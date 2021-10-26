import React, {	Component } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, getDoc, doc } from 'firebase/firestore'

//var firebase = require('firebase');
var firebaseConfigComp = require('../referenceVars/firebaseConfig')
const firebaseConfig = firebaseConfigComp.firebaseConfig

export default class FirebaseInitializer{	
  constructor(data) {
    // This class is not just for Firebase but it will have auth, db modules defined inside one class
    // Tomorrow if db changes we will include the config for db in this class itself
    const app = initializeApp(firebaseConfig);
    
    this.auth = getAuth(); 
    this.db = getFirestore(app);
    this.loggedIn = false;     
    this.userdata = {
      last_start:0,
      current_timertime: 0,
      current_task: "",
      historical_data : []
    }
	} 

  async initializeUserSetup(user, frompage) {
    const useruid=user.uid
    console.log("initializing " + useruid + ' from ' + frompage)

    var userdoc = {"collection" :{
      "name":"timer_users",
      "document":{
        "name":useruid,
        "limit":10
      }
    }}
    console.debug("loading snapshot");
    let snapshot = await this.getDocument(userdoc)
    console.debug("snapshot loaded " + snapshot);
    if(snapshot.exists) {
        let initdata = snapshot.data()
        console.log('There is such document ' + JSON.stringify(initdata))
        this.userdata.last_start = initdata.last_start
        this.userdata.current_timertime = initdata.current_timertime
        this.userdata.current_task = initdata.current_task
        this.getHistoricalData(useruid)
      } else {
        console.log('There is no such document')
        let initdata = {
          last_start:0,
          current_timertime:0,
          current_task:"",
          historical_data: []
        }
        collection(this.db, 'timer_users').doc(useruid).set(initdata)
      }
      console.log("initialized with user data " + JSON.stringify(this.userdata))
  }

/*  async getDocument(nestedCollectionObject) {
    var collectionCallback;
    var init = false;
    while(nestedCollectionObject !== undefined && (nestedCollectionObject.hasOwnProperty("collection") || nestedCollectionObject.hasOwnProperty("document"))) {
      console.log(JSON.stringify("collection object is " + nestedCollectionObject))
      if(nestedCollectionObject.hasOwnProperty("collection")) {
        var collname = nestedCollectionObject.collection.name;
        nestedCollectionObject = nestedCollectionObject.collection;
        if(collname !== "") {
          if(init === false) {
            collectionCallback = collection(this.db, collname)
          } else {
            collectionCallback = collectionCallback.collection(this.db, collname)
          }   
          init = true;       
        }
      } else if(nestedCollectionObject.hasOwnProperty("document")) {
        var docname = nestedCollectionObject.document.name;
        nestedCollectionObject = nestedCollectionObject.document
        if(docname != "") {
          collectionCallback = collectionCallback.doc(this.db, docname) 
        }
      }
    }
    return collectionCallback.get()
  }
*/

  async getDocument(nestedCollectionObject) {
      console.log(nestedCollectionObject)
      var collectionCallback;
      let collectionCallbackString = '';
      let isDoc = false;
      while(nestedCollectionObject !== undefined && (nestedCollectionObject.hasOwnProperty("collection") || nestedCollectionObject.hasOwnProperty("document"))) {        
        if(nestedCollectionObject.hasOwnProperty("collection")) {
          nestedCollectionObject = nestedCollectionObject.collection
          collectionCallbackString = collectionCallbackString.concat(nestedCollectionObject.name);
          isDoc = false;
        } else if(nestedCollectionObject.hasOwnProperty("document")) {
          nestedCollectionObject = nestedCollectionObject.document
          collectionCallbackString = collectionCallbackString.concat(nestedCollectionObject.name);
          isDoc = true;
        }
        collectionCallbackString = collectionCallbackString.concat('/');
      }      
      collectionCallbackString = collectionCallbackString.substring(0, collectionCallbackString.length - 1);
      console.log(collectionCallbackString)
      if(isDoc) {
        collectionCallback = doc(this.db, collectionCallbackString)
        return getDoc(collectionCallback)
      } else {
        collectionCallback = collection(this.db, collectionCallbackString)
        return collectionCallback
      }
      
  }

  async getHistoricalData(useruid) {
    var historydocs = {
        "collection" :{
        "name":"timer_users",
        "document":{
          "name":useruid,
          "collection": {
            "name": "history"
          }
        }
      }
    }

    const history = []
    let snapshot = await this.getDocument(historydocs)
    snapshot.docs.map(doc => {
      history.push(doc.data())
      console.log(doc.data())
    })

    this.userdata.historical_data = history
  }

  async addToDb(dataObject, nestedCollectionObject) {
    console.log("adding dataObject to db " + JSON.stringify(dataObject))
    var collectionCallback;
    var init = false;
      console.log(JSON.stringify(nestedCollectionObject))

    while(nestedCollectionObject !== undefined && (nestedCollectionObject.hasOwnProperty("collection") || nestedCollectionObject.hasOwnProperty("document"))) {
      console.log(JSON.stringify("collection object is " + nestedCollectionObject))
      if(nestedCollectionObject.hasOwnProperty("collection")) {
        var collname = nestedCollectionObject.collection.name;
        nestedCollectionObject = nestedCollectionObject.collection;
        if(collname !== "") {
          if(init === false) {
            collectionCallback = collection(this.db, collname)
          } else {
            collectionCallback = collectionCallback.collection(this.db, collname)
          }   
          init = true;       
        }
      } else if(nestedCollectionObject.hasOwnProperty("document")) {
        var docname = nestedCollectionObject.document.name;
        nestedCollectionObject = nestedCollectionObject.document
        if(docname != "") {
          collectionCallback = collectionCallback.doc(String(docname)) 
        }
      }
    }

    await collectionCallback.set(dataObject).then(ref => {
       console.log("document added ") 
       this.userdata = dataObject
    }).catch(error => {
      console.log("Error adding document " + error.code + " " + error.message)
    })
    console.debug("added dataObject to db ")      
  }

  async login(email, password) {
      var currentuser;
      await signInWithEmailAndPassword(this.auth, email, password)
          .then((authuser) => {
            console.log("login success")
            currentuser=authuser
          })
          .catch((error) => {console.log("login failed " + error.code + " " + error.message)})
      if(currentuser) {
        //console.log("Login success " + JSON.stringify(currentuser))
        await initializeUserSetup(currentuser.user, "loginmethod")
      } else {
        console.log("authentication error " + currentuser)
      }      
  }

  getuserdata(reload) {
    return this.userdata
  }

/*  async loadSubFromCollection(documentid, collection) {
    await this.db.collection(collection).doc(document)
  }*/


  async loaduserdata() {
    console.log("test2")
    let snapshot = await collection(this.db, 'timer_users').doc(this.getUser().uid).get()
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
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signout() {
    console.log('signing out');
    await signOut(this.auth); 
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
