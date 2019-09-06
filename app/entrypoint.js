import AuthRouter from './authrouter.js'
import  { FirebaseContext } from './firebaseInstance.js';
import React from 'react'


const EntryPoint = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <AuthRouter firebaseClass={firebase}/>
    }}
  </FirebaseContext.Consumer>
);

export default EntryPoint;
