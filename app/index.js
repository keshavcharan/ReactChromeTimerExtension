import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './entrypoint.js'

import Firebase, {	FirebaseContext } from './firebaseInstance.js'

var fb = new Firebase()
async function initializeFirebase() {
	console.log("Init index");
    await new Promise((resolve, reject) => { 
    	fb.auth.onAuthStateChanged(user => {
    		//unsubscribe();
    		resolve(user);
	        console.log("Listener called")
	        if (user) { 
	        	fb.setLoggedIn(true)
	          	console.log("Logged in as " + user.email)
	        } else {
	        	fb.setLoggedIn(false)
	          	console.log("Not Authenticated")
	        }
    	}, reject);
	});
    console.log("Init exit");
    ReactDOM.render(
    			<FirebaseContext.Provider value={fb}> 
					<EntryPoint />
				</FirebaseContext.Provider>, 
				document.getElementById('app'));
}

initializeFirebase()

