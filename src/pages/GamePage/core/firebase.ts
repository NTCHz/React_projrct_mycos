// firebase.js

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBej8KvvlOW5BAjqjf-qAHiuX6HJ96Qnkw",
  authDomain: "wordgame-c6ff2.firebaseapp.com",
  projectId: "wordgame-c6ff2",
  storageBucket: "wordgame-c6ff2.appspot.com",
  messagingSenderId: "387583863959",
  appId: "1:387583863959:web:b13863a8676e83e6cd4dd2",
  measurementId: "G-8QTYPFLJ8R",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
