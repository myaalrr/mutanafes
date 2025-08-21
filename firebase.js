/*my-website > firebase.js */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAekJ9CFG9SvtswlKAGVoFOwzVc8NPVGl4",
  authDomain: "mutanafes0.firebaseapp.com",
  databaseURL: "https://mutanafes0-default-rtdb.firebaseio.com",
  projectId: "mutanafes0",
  storageBucket: "mutanafes0.appspot.com",
  messagingSenderId: "61299874497",
  appId: "1:61299874497:web:b4573b422a5fcc7da55240"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
