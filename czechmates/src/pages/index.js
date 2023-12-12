import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../SignIn/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auto } from '@popperjs/core';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../SignIn/firebaseConfig';
import { db } from '../firebase';
import { child, get, ref, set, push, onValue, update } from "firebase/database";
import DBFunctions from '../utils/firebaseQueries';
import userTemplate from '../utils/userTemplate.json';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Login = ({ setUserId }) => {

    var [pretendToken, setPretendToken] = useState("User1");


    // useEffect(() => {

    // }, [setUserId]);


    const navigate = useNavigate();


    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("logged in successfully ", user);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                const dbRef = ref(db);
        
        get(child(dbRef, `Users/` + user.uid)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                setUserId(user.uid);
                sessionStorage.setItem("User", user.uid);
                navigate('/home');
                
            } else {
                console.log("No data available");
                DBFunctions.createNewUser(userTemplate, user.uid, user.email, user.displayName);
                setUserId(user.uid);
                sessionStorage.setItem("User", user.uid);
                navigate('/home');
            }
        }).catch((error) => {
            console.error(error);
        });
            }).catch((error) => {
                console.log("error");
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
            console.log("at all?");
            
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
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <Row>
                    <Col>
                        <div  style={{textAlign:'center'}}>
                            <h1>Nudge Character Management Login</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    {/* <Button style={{display:'block', margin:auto}} onClick={() => { toSubPage() }}>Test button</Button> */}
                    <Button style={{display:'block', margin:auto}}  onClick={handleGoogle}>Sign in with Google </Button>
                    </Col>
                  
                </Row>


            </Container>
        </>

    );
}


export default Login;