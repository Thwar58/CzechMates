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
import Func from './utils/attributeFunctions';
import { ref, set } from "firebase/database";
import { db } from './firebase';
import { onValue } from "firebase/database";
import { child, get } from "firebase/database";

// anything in this app script will appear/be available on every page
function App() {

    // https://firebase.google.com/docs/database/web/read-and-write
    function writeFakeUserData(userId, name, email, imageUrl) {
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }
    // writeFakeUserData("1", "2", "3", "4");


    function writeUserData(userId, adminStatus, email, followers, following, friends, mode, name) {
        set(ref(db, 'Users/' + userId), {
            Admin_Status: adminStatus,
            Email: email,
            Followers: followers,
            Following: following,
            Friends: friends,
            Light_Mode: mode,
            Name: name
        });
    }

    // writeUserData("User3", "False", "user3@gmail.com", ["F1"], ["F2"], ["F3"], "Dark", "User3");


    function writeWorldData(userId, inviteCode, members, name, schedule) {
        set(ref(db, 'Worlds/' + userId + "/Worlds"),
            {
                Invite_Code: inviteCode,
                Members: members,
                Name: name,
                Schedule: schedule
            });
    }

    // writeWorldData("User3", "code4", ["M1", "M2"], "world2 (3)", "Sundays at 5");


    // I got lazy and only did the minimum in general but the rest should be the same
    function writeCharacterData(userID, charId, name, concept) {
        set(ref(db, 'Characters/' + userID + "/" + charId + "/General"),
            {
                Name: name,
                High_Concept: concept
            });
    }

    // writeCharacterData("User3", "CharID1", "Char1", "rogue");



    // https://firebase.google.com/docs/database/web/read-and-write
    // read data
    function readUserData() {
        const dbRef = ref(db);
        get(child(dbRef, `Codes`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // readUserData();




    // examples of calling the attribute calculation methods
    Func.calcAwareness();
    Func.calcMovement();
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