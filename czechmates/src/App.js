// link for multiple pages
//https://www.geeksforgeeks.org/react-styled-components-module/
// link for bootstrap test
// https://www.turing.com/kb/bootstrap-with-react
// if you have this issue:  Plugin "react" was conflicted between "package.json » eslint-config-react-app » :
// go to package.json and save the file, it will fix for a little bit
// to fix it overall I think we need to rename the repo in all lowercase

import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Characters from './pages/charactersPage';
import Profile from './pages/profilePage';
import Worlds from './pages/worldsPage';
import Dropdown from './components/Dropdown';
import NavWithDD from './components/NavWithDropdown';
import Form from './components/Form';
import ValidationForm from './components/ValidationForm';
import ControlledTabs from './components/Tabs';
import TooltipPositions from './components/ToolTip';
import PopoverPositions from './components/Popover';

function App() {
    return (
        <>
            <NavWithDD/>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/charactersPage' element={<Characters />} />
                    <Route path='/worldsPage' element={<Worlds />} />
                    <Route path='/profilePage' element={<Profile />} />
                </Routes>
            </Router>
            <Dropdown/>
            <Form/>
            <ValidationForm/>
            <ControlledTabs/>
            <TooltipPositions/>
            <PopoverPositions/>


            <div className='App'>
                <header className='App-header'>
                    <div class='alert alert-primary' role='alert'>
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

export default App;