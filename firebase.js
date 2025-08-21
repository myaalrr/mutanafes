// my-website/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBj0NoTuwdPrN1N4x9qCfdORs6-IfPXFtc",
  authDomain: "mutanafees.firebaseapp.com",
  databaseURL: "https://mutanafees-default-rtdb.firebaseio.com",
  projectId: "mutanafees",
  storageBucket: "mutanafees.firebasestorage.app",
  messagingSenderId: "177816815443",
  appId: "1:177816815443:web:1e6ee97a70a83f1d9d03a6",
  measurementId: "G-TVSF19YJSE"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
