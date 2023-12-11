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

/**
 * Purpose: this component is the navigation bar
 * Params: 
 * userId: string, the current user's id
 * setUserId: function, sets the user id
 * userTheme: the user's color theme
 * setUserTheme: function, sets the user's color theme
 */
function NavWithDD({ userId, setUserId, userTheme, setUserTheme }) {
  // useState for displaying the admin button
  var [adminButton, setAdminButton] = useState();
  // used in page navigation
  const navigate = useNavigate();


  /**
   * Purpose: logs the user out
   * Params/Dependencies: none
   */
  const logout = () => {
    // navigate tot the login page and clear the user information
    navigate('/');
    setUserId(null);
    sessionStorage.removeItem("User");
  }

  /**
  * Purpose: determines if the user is an admin and if they should have the admin button displayed
  * Params/Dependencies: 
  * userId
  */
  useEffect(() => {
    if (userId !== undefined) {
      // get the admin status of the user in the database
      const userRef = ref(db, `Users/${userId}/Admin_status`);
      onValue(userRef, (snapshot) => {
        // if they are admin, display the button 
        if (snapshot.val() === true) {
          // when clicked, redirect to the firebase admin site
          // https://medium.com/coding-beauty/react-open-link-in-new-tab-b48fca2ce86f#:~:text=2-,To%20open%20a%20link%20in%20a%20new%20tab%20in%20React,opened%20in%20a%20new%20tab.
          setAdminButton(
            <NavDropdown.Item
              href="https://console.firebase.google.com/project/nudge-ttrpg/database/nudge-ttrpg-default-rtdb/data?utm_source=welcome&utm_medium=email&utm_campaign=welcome_2021_CTA_A"
              target="_blank"
              rel="noreferrer">
              <Button>Admin</Button>
            </NavDropdown.Item>);
        }
      });
    }

  }, [userId]);

  /**
  * Purpose: changes the user's color theme
  * Params/Dependencies: none (runs once on startup)
  */
  useEffect(() => {
    // set dark mode if the user swaps to it
    if (userTheme === 'dark') {
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function (btn) {
        // Add a new class "newClass" to each button element
        btn.classList.add('dark');
      });
      // swap to light mode if the user swaps to it
    } else {
      var btnElements = document.querySelectorAll('.btn');
      btnElements.forEach(function (btn) {
        // Add a new class "newClass" to each button element
        btn.classList.add('light');
      });
    }
  }, []);

  /**
  * Purpose: renders the navigation bar
  * Params/Dependencies: 
  * userId
  * userTheme
  * adminButton
  */
  return (
    <Navbar variant="dark" bg="dark" sticky='top'>
      <Container fluid>
        {/* the regular pages */}
        <Navbar.Brand href="home">Home</Navbar.Brand>
        <Navbar.Brand href="charactersPage">Characters</Navbar.Brand>
        <Navbar.Brand href="worldsPage">Worlds</Navbar.Brand>
        <Navbar.Brand href="profilePage">Profiles</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="navbar-dark-example">
          <Nav>
            {/* the dropdown with more options */}
            <NavDropdown
              id="nav-dropdown-dark-example"
              title="Dropdown"
              menuVariant="dark"
            >
              <NavDropdown.Item>
                {/* button to change color modes */}
                <LightModeButton userId={userId} userTheme={userTheme} setUserTheme={setUserTheme} />
              </NavDropdown.Item>
              {/* button to log out */}
              <NavDropdown.Item>
                <Button onClick={logout}>Log Out</Button>
              </NavDropdown.Item>
              {/* the admin button if the user is an admin */}
              {adminButton}
            </NavDropdown>
          </Nav>
          {/* the help page if the user needs more instructions */}
          <Navbar.Brand href="helpPage">Help Page</Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavWithDD;