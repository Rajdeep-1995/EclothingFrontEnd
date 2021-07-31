import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "w",
  authDomain: "ecomm.firebaseapp.com",
  projectId: "ecommer",
  storageBucket: "ecommercb.appspot.com",
  messagingSenderId: "103382987654",
  appId: "9:1033877981245:web:5648f2b98655gff",
};

// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
