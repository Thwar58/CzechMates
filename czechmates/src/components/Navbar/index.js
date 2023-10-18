import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";
 
function Navbar(){
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/" activestyle = "true">
                        Home
                    </NavLink>
                    <NavLink to="/charactersPage" activestyle = "true">
                        Characters
                    </NavLink>
                    <NavLink to="/worldsPage" activestyle = "true">
                        Worlds
                    </NavLink>
                    <NavLink to="/profilePage" activestyle = "true">
                        Profile
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;