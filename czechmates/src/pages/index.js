import React from 'react';

import Dropdown from '../components/Dropdown';
import Form from '../components/Form';
import ValidationForm from '../components/ValidationForm';
import ControlledTabs from '../components/Tabs';
import TooltipPositions from '../components/ToolTip';
import PopoverPositions from '../components/Popover';
import Spacer from '../components/Spacer';
import Popup from '../components/Modal';


const Home = () => {
    return (
        <>
            <div>
                <h1>This is the Home page</h1>
            </div>
            <Spacer />
            <Dropdown />
            <Spacer />
            <Form />
            <Spacer />
            <ValidationForm />
            <Spacer />
            {/* <ControlledTabs /> */}
            <Spacer />
            <TooltipPositions />
            <Spacer />
            <PopoverPositions />
            <Spacer />
            <Popup />



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
);}


export default Home;