
import React from "react";
import Dropdown from "../components/Dropdown";
import Character from "../components/Character";


const CharactersPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Character List
            </h1>
            <Dropdown text="Order by..." actions={["level", "recently used", "alphabetically"]}/>
            <Character/>
            <Character/>
            <Character/>
            <Character/>
            <h1>
                <button type="button" class="btn btn-primary">Plus sign icon</button>
            </h1>

        </div>
    );
};

export default CharactersPage;