import React from 'react';

import Dropdown from '../components/Reference/Dropdown';
import Form from '../components/Reference/Form';
import ValidationForm from '../components/Reference/ValidationForm';
import TooltipPositions from '../components/Reference/ToolTip';
import PopoverPositions from '../components/Reference/Popover';
import Spacer from '../components/Reference/Spacer';
import Popup from '../components/Reference/Modal';
import DropDownShowsValue from '../components/DropDownShowsValue';

// this is the home page, as of now it is mostly reference material and will be largely removed
const Home = () => {
    return (
        <>
            <div>
                <h1>This is the Home page</h1>
            </div>
            <DropDownShowsValue text="Test" actions={["a", "b", "c"]}></DropDownShowsValue>
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
    );
}


export default Home;