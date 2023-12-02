import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../SignIn/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Login = ({setUserId}) => {

    var [pretendToken, setPretendToken] = useState("User2");


    // useEffect(() => {
      
    // }, [setUserId]);
   

    const navigate = useNavigate();
    

    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }
    // console.log("check url", window.location.href);
    const toSubPage = () => {
        // setUserId("User1");
        
        // sessionStorage.setItem("User", "User1");
        // setReload(true);
        // console.log("this is set reload ", setReload);
        // console.log("session should be set to a user ", sessionStorage.getItem("User"));
        
        setUserId(pretendToken);
        sessionStorage.setItem("User", pretendToken);
        navigate('/home');
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