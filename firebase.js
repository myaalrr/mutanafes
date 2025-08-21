/*my-website > firebase.js */
// my-website/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAekJ9CFG9SvtswlKAGVoFOwzVc8NPVGl4",
  authDomain: "mutanafes0.firebaseapp.com",
  databaseURL: "https://mutanafes0-default-rtdb.firebaseio.com",
  projectId: "mutanafes0",
  storageBucket: "mutanafes0.firebasestorage.app",
  messagingSenderId: "61299874497",
  appId: "1:61299874497:web:b4573b422a5fcc7da55240"
};

// تحقق إذا التطبيق موجود مسبقًا قبل التهيئة
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// تصدير Auth و Realtime Database
export const auth = getAuth(app);
export const db = getDatabase(app);
