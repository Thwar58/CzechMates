// https://react-bootstrap.netlify.app/docs/components/dropdowns/

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

// a component for the navigation bar with a dropdown button incorperated
function NavWithDD() {
  return (
    <Navbar variant="dark" bg="dark" sticky='top'>
      {/* all of the nav bar links */}
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
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
                <Button>Light Mode</Button>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                <Button>Log Out</Button>
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                <Button>Admin</Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavWithDD;