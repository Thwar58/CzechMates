// https://react-bootstrap.netlify.app/docs/components/dropdowns/

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LightModeButton from '../LightModeButton';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { ref, onValue } from "firebase/database";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// a component for the navigation bar with a dropdown button incorperated
function NavWithDD({ userId, setUserId, userTheme, setUserTheme }) {
  // console.log(userId);
  var [adminButton, setAdminButton] = useState();


  const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        setUserId(null);
        sessionStorage.removeItem("User");
        // setReload(true);
        // sessionStorage.removeItem("User");
        // console.log("session should be removed ", sessionStorage.getItem("User"));
    }

  // gets the character information for this user from the database
  useEffect(() => {
    if (userId !== undefined) {
      const userRef = ref(db, `Users/${userId}/Admin_status`);
      onValue(userRef, (snapshot) => {
        // console.log(snapshot.val());
        if (snapshot.val() === true) {
          // https://medium.com/coding-beauty/react-open-link-in-new-tab-b48fca2ce86f#:~:text=2-,To%20open%20a%20link%20in%20a%20new%20tab%20in%20React,opened%20in%20a%20new%20tab.
          setAdminButton(
            <NavDropdown.Item  
            href="https://console.firebase.google.com/project/nudge-ttrpg/database/nudge-ttrpg-default-rtdb/data?utm_source=welcome&utm_medium=email&utm_campaign=welcome_2021_CTA_A"
            target="_blank"
            rel="noreferrer">
              <Button>Admin</Button>
            </NavDropdown.Item>);
        }
        else {
          // console.log("not admin");
        }
        // setCharInfo(snapshot.val());
      });
    }

  }, [userId]);

  useEffect(()=>{
    if(userTheme === 'dark'){
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function(btn) {
        // Add a new class "newClass" to each button element
        btn.classList.add('dark');
    });
      // updates[`Users/${userId}/Light_Mode`] = userTheme;
    }else{
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function(btn) {
        // Add a new class "newClass" to each button element
        btn.classList.add('light');
    });
  }
  },[]);

  return (
    <Navbar variant="dark" bg="dark" sticky='top'>
      {/* all of the nav bar links */}
      <Container fluid>
        <Navbar.Brand href="home">Home</Navbar.Brand>
        <Navbar.Brand href="charactersPage">Characters</Navbar.Brand>
        <Navbar.Brand href="worldsPage">Worlds</Navbar.Brand>
        <Navbar.Brand href="profilePage">Profiles</Navbar.Brand>
        {/* button options below */}
        {/* <Button href="/">Home</Button>
        <Button href="charactersPage">Characters</Button>
        <Button href="worldsPage">Worlds</Button>
        <Button href="profilePage">Profiles</Button> */}
        <Navbar.Toggle />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            {/* the dropdown button has 3 buttons in it */}
            {/* future: implement actual actions for the buttons */}
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item href="#action/3.1">
                <LightModeButton userId={userId} userTheme={userTheme} setUserTheme={setUserTheme}/>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Button onClick={logout}>Log Out</Button>
              </NavDropdown.Item>
              {adminButton}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavWithDD;