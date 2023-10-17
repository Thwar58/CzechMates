
import React from "react";
import Dropdown from "../components/Dropdown";
import World from "../components/World";


const CharactersPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                World List
            </h1>
            <p>Invite Code<input type="text" placeholder="enter code here" />
            <button type="button" class="btn btn-primary">Enter code</button>
            </p>
            
            
            <Dropdown text="Order by..." actions={["Owned", "Participating", "Alphabetically"]}/>
            <World/>
            <World/>
            <World/>
            <World/>
            <h1>
                <button type="button" class="btn btn-primary">Plus sign icon</button>
            </h1>

        </div>
    );
};

export default CharactersPage;