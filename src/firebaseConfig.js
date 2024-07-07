import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9r6Po7KzZjZnm1w3nHD83yrdUs55o3ZQ",
  authDomain: "typeblitz-f005a.firebaseapp.com",
  projectId: "typeblitz-f005a",
  storageBucket: "typeblitz-f005a.appspot.com",
  messagingSenderId: "211565350825",
  appId: "1:211565350825:web:60c1ac16a1c2b210153eb8",
  measurementId: "G-SFN04J4T3P",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
