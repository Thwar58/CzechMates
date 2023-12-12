// link for multiple pages
//https://www.geeksforgeeks.org/react-styled-components-module/

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Login from './pages';
import Home from './pages/home';
import Characters from './pages/charactersPage';
import Profile from './pages/profilePage';
import Worlds from './pages/worldsPage';
import SubCharacterPages from './pages/subCharacterPages';
import { useState } from 'react';
import { db } from './firebase';
import { ref, update, onValue } from "firebase/database";
import NavWithDD from './components/NavWithDropdown';
import { useEffect } from 'react';
import HelpPage from './pages/helpPage';

/**
 * Purpose: the component that wraps all of the site, everything here is displayed across the whole site
 * Params: none
 */
function App() {
    // useStates for the userId and the user color theme
    const [userId, setUserId] = useState(sessionStorage.getItem("User"));
    const [userTheme, setUserTheme] = useState('');


    /**
     * Purpose: reads the user's information from the database
     * Params/Dependencies: userId
     */
    useEffect(() => {
        if (userId !== undefined) {
            const userRef = ref(db, 'Users/' + userId);
            onValue(userRef, (snapshot) => {
                if (snapshot.val() !== null) {
                    setUserTheme(snapshot.val().Light_Mode);
                }
            });
        }

    }, [userId]);

    /**
     * Purpose: reads the user's color theme for the user
     * Params/Dependencies: userId
     */
    useEffect(() => {
        if (userTheme !== "" && userId !== null) {
            const userRef = ref(db);
            const updates = {};
            updates[`Users/${userId}/Light_Mode`] = userTheme;
            update(userRef, updates);
        }
    }, [userTheme]);

    /**
     * Purpose: if there is no userId, then you will be sent to the login page
     * Params/Dependencies: 
     * userId
     */
    if (userId === null) {
        return (
            <div style={{ fontFamily: 'Anton' }}>
                {/* router handles all of the page rerouting */}
                <Router>
                    {/* route to the login page */}
                    <Routes>
                        <Route path='/' element={<Login setUserId={setUserId} userId={userId} />}></Route>
                    </Routes>
                </Router>
            </div>
        );
    }

    /**
     * Purpose: if there is a userId then the user is allowed to roam the site with the navigaton bar
     * Params/Dependencies: 
     * userId
     */
    return (
        <div className={"body_" + userTheme} style={{ fontFamily: 'Anton' }}>
            {/* router handles all of the page rerouting */}
            <Router>
                {/* the navigation bar */}
                <NavWithDD setUserId={setUserId} userId={userId} userTheme={userTheme} setUserTheme={setUserTheme}></NavWithDD>
                {/* routes are the paths to the pages with their export value */}
                <Routes>
                    <Route path='/' element={<Login setUserId={setUserId} userId={userId} userTheme={userTheme} />}></Route>
                    <Route path='/home' element={<Home userId={userId} userTheme={userTheme} />} />
                    <Route path='/charactersPage' element={<Characters userId={userId} userTheme={userTheme} />} />
                    <Route path='/worldsPage' element={<Worlds userId={userId} userTheme={userTheme} />} />
                    <Route path='/profilePage' element={<Profile userId={userId} userTheme={userTheme} />} />
                    <Route path='/subCharacterPages' element={<SubCharacterPages userId={userId} userTheme={userTheme} />} />
                    <Route path='/helpPage' element={<HelpPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;