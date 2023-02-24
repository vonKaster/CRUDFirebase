import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAruA02UfLyLOUo3Y6PmZWa4oPPeVS55OQ",
  authDomain: "crudfirebase-d3063.firebaseapp.com",
  projectId: "crudfirebase-d3063",
  storageBucket: "crudfirebase-d3063.appspot.com",
  messagingSenderId: "732639291049",
  appId: "1:732639291049:web:25927ff594f8b7f0de6bb8",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
const FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
const GithubAuthProvider = firebase.auth.GithubAuthProvider;

export {
  db,
  auth,
  storage,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
};
