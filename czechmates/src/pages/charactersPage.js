
import React from "react";
import Dropdown from "../components/Dropdown";
import Character from "../components/Character";
import { useNavigate } from 'react-router-dom';
import DropDownShowsValue from "../components/DropDownShowsValue";

// a component for the main character page
const CharactersPage = () => {

    // handles page navigation
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPage
        navigate('/subCharacterPages');
    }
    return (
        <div>
            <h1 style={{ color: "green" }}>
                Character List
            </h1>
            {/* the dropdown for sorting selection */}
            <DropDownShowsValue text="Order by..." actions={["level", "recently used", "alphabetically"]} />
            {/* future: pass information in */}
            {/* future: generate dynamically instead of hardcoding */}
            <Character />
            <Character />
            <Character />
            <Character />
            {/* button that redirects to the subchar pages */}
            <div>
                <button onClick={navigateToGeneral} type="button" className="btn btn-primary">Plus sign icon</button>
            </div>

        </div>
    );
};

export default CharactersPage;