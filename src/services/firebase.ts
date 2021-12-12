import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyC_BhhHJmiTPLs6c-b-7TwulMLhRQWvJVk",
  authDomain: "let-me-ask-32cd1.firebaseapp.com",
  databaseURL: "https://let-me-ask-32cd1-default-rtdb.firebaseio.com",
  projectId: "let-me-ask-32cd1",
  storageBucket: "let-me-ask-32cd1.appspot.com",
  messagingSenderId: "937457035423",
  appId: "1:937457035423:web:5c449d2a60c497ab345aaa"
};
  
firebase.initializeApp(firebaseConfig);

 const auth = firebase.auth();
 const database = firebase.database(); 

 export {firebase, auth, database}