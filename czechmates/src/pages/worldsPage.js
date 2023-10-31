
import React from "react";
import World from "../components/World";
import ManageWorldPopup from '../components/ManageWorldPopup';
import JoinCodePopup from "../components/JoinCodePopup";
import DropDownShowsValue from "../components/DropDownShowsValue";

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
            <DropDownShowsValue text="Order by..." actions={["Owned", "Participating", "Alphabetically"]} />
            {/* future: generage dynamically instead of hardcoding 
            its too much trouble doing this in a faked way, wait until
            we are actually pulling data from the database to handle it*/}
            <World worldName={"filler name"} />
            <World worldName={"filler name 2"} />
            <World worldName={"filler name 3"} />
            {/* this brings up the modal for creating a world */}
            <ManageWorldPopup title="World Name" button={"Plus Sign"} />
        </div>
    );
};

export default WorldPage;