import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './firebaseConfig'; 
import Popup from "../components/Modal";

export default function HomePage() {
    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }


}