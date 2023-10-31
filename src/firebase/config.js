import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyA2qGzP_Qj9ngjnFdWo_Od6mt7pQg_lOiw",
    authDomain: "proint3.firebaseapp.com",
    projectId: "proint3",
    storageBucket: "proint3.appspot.com",
    messagingSenderId: "401623378985",
    appId: "1:401623378985:web:fbfc55981a107c75238038"
  };

  app.initializeApp(firebaseConfig)
  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore() 