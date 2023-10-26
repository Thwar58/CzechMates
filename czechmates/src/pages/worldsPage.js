
import React from "react";
import Dropdown from "../components/Dropdown";
import World from "../components/World";
import ManageWorldPopup from '../components/ManageWorldPopup';
import JoinCodePopup from "../components/JoinCodePopup";

// this is the world page
const WorldPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                World List
            </h1>
            {/* the invite code input section */}
            <p>Invite Code
                <input type="text" placeholder="enter code here" />
                {/* the button triggers the join from code modal */}
                <JoinCodePopup name={"World Name"} />
            </p>
            {/* dropdown for world sorting options */}
            <Dropdown text="Order by..." actions={["Owned", "Participating", "Alphabetically"]} />
            {/* future: generage dynamically instead of hardcoding */}
            <World />
            <World />
            <World />
            <World />
            {/* this brings up the modal for creating a world */}
            <ManageWorldPopup title="World Name" button={"Plus Sign"} />
        </div>
    );
};

export default WorldPage;