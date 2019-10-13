import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './entrypoint.js'
import Firebase, {	FirebaseContext } from './firebase/firebaseInstance.js'
var fb = new Firebase()

async function initializeFirebase() {
	console.log("Initializing app");
    await new Promise((resolve, reject) => { 
    	var unsubscribe = fb.auth.onAuthStateChanged(user => {
    		unsubscribe();
    		resolve(user);
	        if (user) {
	        	fb.initializeUserSetup(user, "fromlogin").then(() => {
	        		fb.setLoggedIn(true)
	        		console.debug("Rendering log")
				    ReactDOM.render(
				    	<div>
							<EntryPoint firebaseclass={fb}/>
						</div>, 
					document.getElementById('app'));
	        	})
	        } else {
	        	fb.setLoggedIn(false)
				console.log("Not Authenticated")
			    ReactDOM.render(
			    	<div>
						<EntryPoint firebaseclass={fb}/>
					</div>, 
				document.getElementById('app'));		          	
	        }

    	}, reject);
	});

}

initializeFirebase()
