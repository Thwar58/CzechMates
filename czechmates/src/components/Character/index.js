// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js:418-430

import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";


// the character component
// input: the character name, the character id, the user id, and the character information 
const Character = ({ charName, charId, userId, charInfo }) => {

    // used in page navigations
    const navigate = useNavigate();

    // this function redirects the user to the subcharacter page while also passing the character id through the state
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const toSubPage = () => {
        navigate('/subCharacterPages', { state: { charId: charId } });
    }

    // this function copies the character in this component
    // it is added to the database with an automatically generated unique key
    // the UI is updates automatically
    const copyChara = event => {
        var copy = charInfo;
        // appends copy to the name
        copy.General.Name = `${charName} Copy`;
        // updates the database
        DBFunctions.copyCharacter(userId, copy);
    };

    const charData = [
        ["Name", "Konan"],
        ["Level", "12"],
        ["Class", "Barbarian"],
        // Add more data as needed
    ];

    //prints the character as a csv
    function printChar() {
        const csvContent = charData.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "CharTest.csv";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // this will be used later when we actually implement character removals
    // it is in this file for testing purposes
    // const removeOrEdit = event => {
    //     // DBFunctions.removeFromDB('Characters/User1/CharID3/General');
    //     DBFunctions.editInDB('Characters/User1/CharID3/General/Name', "test2");
    //     // DBFunctions.removeFromDB('Users/User1/Followers/User7');
    //     // const updates = {};
    //     // updates['User/'] = "New Name";
    //     // updates['Characters'] = "New Name";
    //     // DBFunctions.updateMultPlaces(updates);
    // };



    // return a div with the character name and buttons for each option
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                    Character
                </InputGroup.Text>
                {/* sets the value to the character name */}
                <Form.Control
                    value={charName}
                    // set to readonly so that the user can still trigger onClick methods (disabled turns them off)
                    readOnly={true}
                    // navigate to the subcharacter page with the relevant information when clicked
                    onClick={() => { toSubPage() }}
                />
                {/* copy button */}
                <Button onClick={copyChara} variant="outline-secondary" id="button-addon2">
                    Copy
                </Button>
                {/* edit button */}
                <Button onClick={() => { toSubPage() }} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>
                {/* remove button with confirmation popup */}
                <ConfirmationPopup id="removeButton" name="Remove" />
                {/* print button */}
                <Button variant="outline-secondary" id="button-addon2" onClick={printChar}>
                    Print
                </Button>
            </InputGroup>
        </div>
    );
};

export default Character;