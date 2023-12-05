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
import EmbeddedEmail from './components/Email/email';

// anything in this app script will appear/be available on every page
function App() {

    // var userId = sessionStorage.getItem("User");
   const [userId, setUserId] = useState(sessionStorage.getItem("User"));
   const [userTheme,setUserTheme] = useState('');
    // console.log(userId);
    // var [userId, setUserId] = useState(sessionStorage.getItem("User"));

    // var [reload, setReload] = useState(false);

    useEffect(() => {
        console.log("user has changed", userId);
        if (userId !== undefined){
            const userRef = ref(db, 'Users/' + userId);
            onValue(userRef, (snapshot) => {
                if(snapshot.val()!==null){
                // console.log("repeated? ", snapshot.val());
                setUserTheme(snapshot.val().Light_Mode);
                console.log(snapshot.val());
                console.log(snapshot.val().Light_Mode);
                }
            });
        }
      
    }, [userId]);

    useEffect(() => {
        if (userTheme !== ""){
            console.log("set the theme", userId);
            const userRef = ref(db);
            const updates = {};
            updates[`Users/${userId}/Light_Mode`] = userTheme;
            console.log(updates);
            update(userRef, updates);
        }
       
    }, [userTheme]);
 
    // var [test, setTest] = useState(false);
    if (userId === null) {
        console.log("this is the session variable when reload is false", sessionStorage.getItem("User"));
        return (
            <div style={{ fontFamily: 'Anton' }}>
                 <div>App says user is {userId}</div>
                 
                {/* router handles all of the page rerouting */}
                <Router>
                    {/* the navigation bar */}
                    {/* routes are the paths to the pages with their export value */}
                    <Routes>
                        <Route path='/' element={<Login setUserId={setUserId} userId={userId} />}></Route>
                    </Routes>
                </Router>
            </div>
        );
    }
    // console.log("app is rerendering");
    return (
        <div className={"body_"+userTheme} style={{ fontFamily: 'Anton' }}>
             <div>App says user is {userId}</div>
             <EmbeddedEmail></EmbeddedEmail>
             
            {/* router handles all of the page rerouting */}
            <Router>
                {/* the navigation bar */}
                <NavWithDD setUserId={setUserId} userId={userId} userTheme={userTheme} setUserTheme={setUserTheme}></NavWithDD>
                {/* routes are the paths to the pages with their export value */}
               
                <Routes>
               
                    <Route path='/' element={<Login setUserId={setUserId} userId={userId} userTheme={userTheme}/>}></Route>
                    <Route path='/home' element={<Home userId={userId} userTheme={userTheme}/>} />
                    <Route path='/charactersPage' element={<Characters userId={userId} userTheme={userTheme}/>} />
                    <Route path='/worldsPage' element={<Worlds userId={userId} userTheme={userTheme}/>} />
                    <Route path='/profilePage' element={<Profile userId={userId} userTheme={userTheme}/>} />
                    <Route path='/subCharacterPages' element={<SubCharacterPages userId={userId} userTheme={userTheme}/>} />
                    <Route path='/helpPage' element={<HelpPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;