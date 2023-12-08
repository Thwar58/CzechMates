import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../SignIn/firebaseConfig';
import { useState } from 'react';
import NavWithDD from '../components/NavWithDropdown';
import { useEffect } from 'react';
import logo from '../NUDGE_Logo.png';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Home = ({setUserId}) => {
    // const userId = sessionStorage.getItem("User");
    
    // console.log("you're on the home page");
    // console.log(window.location.href);
    // console.log("state", window.location.state);

    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }
    return (
        <div className='text-center fullWindow'>
       
            <div>
                <h1 className={'text-color-yellow text-center'}>Welcome to the NUDGE TTRPG aid</h1>
            </div>
            <div><img style={{width:'50vh', mb:'3'}} src={logo} alt="Logo" /></div>
            {/* <div><Button className={'mb-3'} onClick={handleGoogle}>Sign in with Google </Button></div> */}
            {/* <DropDownShowsValue text="Test" actions={["a", "b", "c"]}></DropDownShowsValue>
            <Spacer />
            <Dropdown />
            <Spacer />
            <Form />
            <Spacer />
            <ValidationForm />
            <Spacer />
            <ControlledTabs />
            <Spacer />
            <TooltipPositions />
            <Spacer />
            <PopoverPositions />
            <Spacer />
            <Popup /> */}



            {/* <div className='App'>
                <header className='App-header'>
                    <div className='alert alert-primary' role='alert'>
                        <p style={{ display: "none" }} className='d-block'>
                            Bootstrap is now successfully installed 😃
                        </p>
                        <p className='d-none'>
                            Bootstrap is not installed if you can see this 😢
                        </p>
                    </div>
                </header>
            </div> */}
        </div>
    );
}


export default Home;