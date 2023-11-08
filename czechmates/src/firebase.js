// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAghA0xCfMfAllSzoa54LVw8QDdemCKvOE",
  authDomain: "nudge-ttrpg.firebaseapp.com",
  databaseURL: "https://nudge-ttrpg-default-rtdb.firebaseio.com",
  projectId: "nudge-ttrpg",
  storageBucket: "nudge-ttrpg.appspot.com",
  messagingSenderId: "400815550263",
  appId: "1:400815550263:web:9a64be822b3618391a74b2",
  measurementId: "G-X1KY0E5YNY"
};

// Initialize Firebase and export the db
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


