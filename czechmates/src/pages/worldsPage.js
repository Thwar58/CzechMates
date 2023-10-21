
import React from "react";
import Dropdown from "../components/Dropdown";
import World from "../components/World";
import ManageWorldPopup from '../components/ManageWorldPopup';
import JoinCodePopup from "../components/JoinCodePopup";


const CharactersPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                World List
            </h1>
            <p>Invite Code<input type="text" placeholder="enter code here" />
            <JoinCodePopup name={"World Name"}/>
            </p>
            
            
            <Dropdown text="Order by..." actions={["Owned", "Participating", "Alphabetically"]}/>
            <World/>
            <World/>
            <World/>
            <World/>
            <ManageWorldPopup title="World Name" button={"Plus Sign"}/>


        </div>
    );
};

export default CharactersPage;