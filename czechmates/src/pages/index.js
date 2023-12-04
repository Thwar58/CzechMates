import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../SignIn/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { auto } from '@popperjs/core';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Login = ({ setUserId }) => {

    var [pretendToken, setPretendToken] = useState("User1");


    // useEffect(() => {

    // }, [setUserId]);


    const navigate = useNavigate();


    const handleGoogle = (e) => {
        const provider = new GoogleAuthProvider();
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
                    <Button style={{display:'block', margin:auto}} onClick={() => { toSubPage() }}>Test button</Button>
                    <Button style={{display:'block', margin:auto}}  onClick={handleGoogle}>Sign in with Google </Button>
                    </Col>
                  
                </Row>


            </Container>
        </>

    );
}


export default Login;