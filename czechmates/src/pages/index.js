import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auto } from '@popperjs/core';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../SignIn/firebaseConfig';
import { db } from '../firebase';
import { child, get, ref } from "firebase/database";
import DBFunctions from '../utils/firebaseQueries';
import userTemplate from '../utils/userTemplate.json';
import logo from '../NUDGE_Logo.png';

/**
 * Purpose: the component for the login page
 * Params: 
 * setUserId: function, sets the user id for the rest of the pages
 */
const Login = ({ setUserId }) => {
    // used in page navigation
    const navigate = useNavigate();

/**
 * Purpose: logs in the user (existing or new) and stores the information that we need from them
 * Params/Dependencies: none
 */
    const handleGoogle = (e) => {
        // give the user a popup and have them choose an account
        const provider =  new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // get the user info from the login and set up the database reference
                const user = result.user;
                const dbRef = ref(db);
        // see if the user is in the database already or not
        get(child(dbRef, `Users/` + user.uid)).then((snapshot) => {
            // if they are, then set the id and go to the home page for this user
            if (snapshot.exists()) {
                setUserId(user.uid);
                sessionStorage.setItem("User", user.uid);
                navigate('/home');
            // if they are not, then make a new user and go to the home page for this user
            } else {
                // use the uid from the login for the key
                DBFunctions.createNewUser(userTemplate, user.uid, user.email, user.displayName);
                setUserId(user.uid);
                sessionStorage.setItem("User", user.uid);
                navigate('/home');
            }
        }).catch((error) => {
            console.error(error);
        });
            }).catch((error) => {
                console.log(error);
            });
    }


/**
 * Purpose: renders the login page
 * Params/Dependencies: none
 */
    return (
        <>
        <div className='mb-5'></div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10 fullWindow">
                <Row>
                    <Col>
                        <div className='mb-5' style={{textAlign:'center'}}>
                            <h1 className='mb-5'>Nudge Character Management Login</h1>
                            <div><img style={{width:'50vh', mb:'3'}} src={logo} alt="Logo" /></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* the button to log in */}
                    <Col>
                    <Button style={{display:'block', margin:auto}}  onClick={handleGoogle}>Sign in with Google </Button>
                    </Col>
                </Row>
            </Container>
        </>

    );
}


export default Login;