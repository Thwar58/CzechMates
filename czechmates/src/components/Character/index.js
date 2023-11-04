// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js:418-430

import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";


// the character component
const Character = ({ charName }) => {
    // handle page navigations
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPages
        navigate('/subCharacterPages');
    }

    const onAddBtnClick = event => {
        DBFunctions.writeCharacterData("User1", "CharID3", "test", "concept");
    };

    const removeOrEdit = event => {
        DBFunctions.removeFromDB('Characters/User1/CharID3/General');
        DBFunctions.editInDB('Characters/User1/CharID3/General/Name', "test2");
    };
    

    // return a div with the character name and buttons for each option
    return (
        <div>
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Character
                    </InputGroup.Text>
                    {/* input the value and disable the input */}
                    <Form.Control
                        value={charName}
                        disabled={true}
                    />
                    {/* first button */}
                    <Button onClick={onAddBtnClick} variant="outline-secondary" id="button-addon2">
                        Copy
                    </Button>
                    {/* second button */}
                    <Button onClick={navigateToGeneral} variant="outline-secondary" id="button-addon2">
                        Edit
                    </Button>
                    <ConfirmationPopup id="removeButton" name="Remove" />
                    <Button onClick={removeOrEdit} variant="outline-secondary" id="button-addon2">
                        Print
                    </Button>
                </InputGroup>
            </>



            {/* future: add char name to div id */}
            {/* <div style={{backgroundColor: "lightblue"}}> */}
            {/* Character Name */}
            {/* copy, edit, remove, and buttons */}
            {/* <button onClick={onAddBtnClick} id="copyButton" type="button" className="btn btn-primary">Copy</button> */}
            {/* edit navigates to the general subcharacter page */}
            {/* <button id="editButton" onClick={navigateToGeneral} type="button" className="btn btn-primary">Edit</button> */}
            {/* remove triggers a confirmation modal */}
            {/* <ConfirmationPopup id="removeButton" name="Remove"/> */}
            {/* <button id="printButton" type="button" className="btn btn-primary">Print</button> */}
            {/* {charDiv} */}
            {/* </div> */}
            {/* {charDiv} */}
        </div>
    );
};

export default Character;