import React from 'react';
import ReactDOM from 'react-dom';
import EntryPoint from './entrypoint.js'

import Firebase, {	FirebaseContext } from './firebaseInstance.js'

ReactDOM.render(<FirebaseContext.Provider value={new Firebase()}> 
					<EntryPoint/>
				</FirebaseContext.Provider>, 
				document.getElementById('app'))