// link for multiple pages
//https://www.geeksforgeeks.org/react-styled-components-module/
// link for bootstrap test
// https://www.turing.com/kb/bootstrap-with-react
// if you have this issue:  Plugin "react" was conflicted between "package.json » eslint-config-react-app » :
// go to package.json and save the file, it will fix for a little bit
// to fix it overall I think we need to rename the repo in all lowercase

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Characters from './pages/charactersPage';
import Profile from './pages/profilePage';
import Worlds from './pages/worldsPage';
import NavWithDD from './components/NavWithDropdown';
import SubCharacterPages from './pages/subCharacterPages';
import { useState } from 'react';

// anything in this app script will appear/be available on every page
function App() {

    // set the user id here according to either a db query or the OAuth
    const [userId] = useState("User1");

    // examples of calling the attribute calculation methods
    // Func.calcAwareness();
    // Func.calcMovement();
    return (
        <div style={{ fontFamily: 'Anton'}}>
            {/* router handles all of the page rerouting */}
            <Router>
                {/* the navigation bar */}
                <NavWithDD />
                {/* routes are the paths to the pages with their export value */}
                <Routes>
                    <Route path='/' element={<Home userId={userId} />} />
                    <Route path='/charactersPage' element={<Characters userId={userId} />} />
                    <Route path='/worldsPage' element={<Worlds userId={userId} />} />
                    <Route path='/profilePage' element={<Profile userId={userId} />} />
                    <Route path='/subCharacterPages' element={<SubCharacterPages userId={userId} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;