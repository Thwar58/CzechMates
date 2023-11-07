// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';



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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;