import React from 'react';

import Button from 'react-bootstrap/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../SignIn/firebaseConfig';
import { useNavigate } from 'react-router-dom';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Login = () => {

    const navigate = useNavigate();
    

    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }
    // console.log("check url", window.location.href);
    const toSubPage = () => {
        navigate('/home', { state: { userId: "User1" } });
    }

  
    return (
        <>
            <div>
                <h1>This is the Login page</h1>
            </div>
            <Button onClick={() => { toSubPage() }}>Test button</Button>
            <Button onClick={handleGoogle}>Sign in with Google </Button>
        </>
    );
}


export default Login;