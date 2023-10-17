
import React from "react";
import Dropdown from "../components/Dropdown";



const CharactersPage = () => {
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Character List
            </h1>
            <Dropdown text="Order by..." actions={["level", "recently used", "alphabetically"]}/>
            <div style={{backgroundColor: "lightblue"}}>
                Character Name
                <button type="button" class="btn btn-primary">Copy</button>
                <button type="button" class="btn btn-primary">Edit</button>
                <button type="button" class="btn btn-primary">Remove</button>
                <button type="button" class="btn btn-primary">Print</button>
            </div>
            <h1>
                <button type="button" class="btn btn-primary">Plus sign icon</button>
            </h1>

        </div>
    );
};

export default CharactersPage;