import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBej8KvvlOW5BAjqjf-qAHiuX6HJ96Qnkw",
  authDomain: "wordgame-c6ff2.firebaseapp.com",
  projectId: "wordgame-c6ff2",
  storageBucket: "wordgame-c6ff2.appspot.com",
  messagingSenderId: "387583863959",
  appId: "1:387583863959:web:b13863a8676e83e6cd4dd2",
  measurementId: "G-8QTYPFLJ8R",
  databaseURL:
    "https://wordgame-c6ff2-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };
