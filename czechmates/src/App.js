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
import {child, get } from "firebase/database";

// anything in this app script will appear/be available on every page
function App() {

   // https://firebase.google.com/docs/database/web/read-and-write
    function writeUserData(userId, name, email, imageUrl) {
        set(ref(db, 'users/' + userId), {
            username: name,
            email: email,
            profile_picture: imageUrl
        });
    }

    // writeUserData("1", "2", "3", "4");

    // const starCountRef = ref(db, 'users/');
    // console.log(starCountRef);
    // onValue(starCountRef, (snapshot) => {
    //     console.log("in");
    //     const data = snapshot.val();
    //     console.log(data);
    //     // updateStarCount(postElement, data);
    // });

    // https://firebase.google.com/docs/database/web/read-and-write
    const dbRef = ref(db);
    get(child(dbRef, `users/`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });



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