import FirebaseContext from './firebaseContext.js'
import Firebase from './firebaseInitializer.js'

var FirebaseWrapper = () => {
  	var firebaseInitialized = new Firebase();  	
  	return firebaseInitialized;
}

export default Firebase;

export { FirebaseContext };