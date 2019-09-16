import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './entrypoint.js'
import Firebase, {	FirebaseContext } from './firebase/firebaseInstance.js'
var fb = new Firebase()
console.log('in index.js');

async function initializeFirebase() {
	console.log("Init index");
    await new Promise((resolve, reject) => { 
    	var unsubscribe = fb.auth.onAuthStateChanged(user => {
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
	    	console.log("Init exit : rendering entry point");
		    ReactDOM.render(
		    	<div>
					<EntryPoint firebaseclass={fb}/>
				</div>, 
			document.getElementById('app'));	
    		unsubscribe();		
    	}, reject);
	});

}

initializeFirebase()
