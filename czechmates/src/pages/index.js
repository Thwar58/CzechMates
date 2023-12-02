import React from 'react';

import Dropdown from '../components/Reference/Dropdown';
import Form from '../components/Reference/Form';
import ValidationForm from '../components/Reference/ValidationForm';
import TooltipPositions from '../components/Reference/ToolTip';
import PopoverPositions from '../components/Reference/Popover';
import Spacer from '../components/Reference/Spacer';
import Popup from '../components/Reference/Modal';
import DropDownShowsValue from '../components/DropDownShowsValue';
import Button from 'react-bootstrap/Button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../SignIn/firebaseConfig';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Home = () => {

    const handleGoogle = (e) => {
        const provider =  new GoogleAuthProvider();
        return signInWithPopup(auth, provider)

    }
    return (
        <>
            <div>
                <h1 className='bigMargins'>Welcome to the NUDGE TTRPG helper site</h1>
                <Button className='bigMargins' onClick={handleGoogle}>Sign in with Google </Button>
            </div>
            



            <div className='App'>
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
            </div>
        </>
    );
}


export default Home;