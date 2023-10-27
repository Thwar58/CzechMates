// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js:418-430

import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import {useNavigate } from 'react-router-dom';
import { useState } from "react";


// the character component
const Character = () => {
    // handle page navigations
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPages
        navigate('/subCharacterPages');
    }

    const [charDiv, addChar] = useState([]);

    const onAddBtnClick = event => {
        addChar(charDiv.concat(<Character/>));
      };

    // return a div with the character name and buttons for each option
    return (
        <div>
            {/* future: add char name to div id */}
            <div style={{backgroundColor: "lightblue"}}>
                Character Name
                {/* copy, edit, remove, and buttons */}
                <button onClick={onAddBtnClick} id="copyButton" type="button" className="btn btn-primary">Copy</button>
                {/* edit navigates to the general subcharacter page */}
                <button id="editButton" onClick={navigateToGeneral} type="button" className="btn btn-primary">Edit</button>
                {/* remove triggers a confirmation modal */}
                <ConfirmationPopup id="removeButton" name="Remove"/>
                <button id="printButton" type="button" className="btn btn-primary">Print</button>
                {charDiv}
            </div>
        </div>
    );
};

export default Character;