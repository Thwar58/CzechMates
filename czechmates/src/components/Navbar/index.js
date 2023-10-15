import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/charactersPage" activeStyle>
                        Characters
                    </NavLink>
                    <NavLink to="/worldsPage" activeStyle>
                        Worlds
                    </NavLink>
                    <NavLink to="/profilePage" activeStyle>
                        Profile
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;