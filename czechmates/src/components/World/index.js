import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';

// a component to display the worlds with their button options
const World = () => {
    return (
        <div>
            <div style={{ backgroundColor: "lightblue" }}>
                World Name
                {/* future: check if they own the world
                if they do then add a star
                set the button names accordingly */}
                {/* modals for each of the given actions: manage, view, remove/leave */}
                <ManageWorldPopup title="World Name" button={"Manage"} />
                <ViewWorldPopup name={"World Name"} />
                <ConfirmationPopup name={"Remove/Leave"} />
            </div>
        </div>
    );
};

export default World;