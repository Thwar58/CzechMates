import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';

const World = () => {
    return (
        <div>
            <div style={{backgroundColor: "lightblue"}}>
                World Name
                {/* check if they own the world
                if they do then add a star
                set the button names accordingly */}
                <ManageWorldPopup title="World Name" button={"Manage"}/>
                <ViewWorldPopup name={"World Name"}/>
                <ConfirmationPopup name={"Remove/Leave"}/>
            </div>

        </div>
    );
};

export default World;