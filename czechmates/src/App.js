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

// anything in this app script will appear/be available on every page
function App() {
    return (
        <>
            {/* router handles all of the page rerouting */}
            <Router>
                {/* the navigation bar */}
                <NavWithDD />
                {/* routes are the paths to the pages with their export value */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/charactersPage' element={<Characters />} />
                    <Route path='/worldsPage' element={<Worlds />} />
                    <Route path='/profilePage' element={<Profile />} />
                    <Route path='/subCharacterPages' element={<SubCharacterPages />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;