// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js:418-430
import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import PrintPopup from "../PrintPopup";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";
import { db } from '../../firebase';
import { ref, onValue, update } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import '../themes.css'

/**
 * Purpose: This component displays the characters on the character page
 * Params:
 * charName: string, the characters name
 * charId: string, the character id
 * userId: string, the user id
 * userTheme: string, the user's color theme
 * lvl
 */
const Character = ({ charName, charId, userId, userTheme, lvl }) => {
    // useState used in page navigations
    const navigate = useNavigate();
    // useState for the character information 
    var [charInfo, setCharInfo] = useState();


    /**
     * Purpose: This function redirects you to the sub character page when you click on edit
     * Params/Dependencies: none
     * Source: https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
     */
    const toSubPage = () => {
        // go to the character page and set the character id so that the page knows what character to display
        navigate('/subCharacterPages', { state: { charId: charId } });
        sessionStorage.setItem("charId", charId);
        // update the database for the characters las used value to show that the character has been accessed
        const charRef = ref(db);
        const updates = {};
        updates[`CharacterUserRel/${userId}/${charId}/Last_Used`] = Date.now();
        update(charRef, updates);
    }


     /**
     * Purpose: crate a copy of the character
     * Params/Dependencies: none
     */
    const copyChara = event => {
        if (charId !== undefined) {
            // set the character information to the character at the appropriate place in the database
            const charRef = ref(db, 'Characters/' + charId);
            onValue(charRef, (snapshot) => {
                setCharInfo(snapshot.val());
            });
        }
    }

    /**
     * Purpose: any time the character info changes, add a new character
     * Params/Dependencies: none
     */
    useEffect(() => {
        if (charInfo !== undefined) {
            // make a copy of the current character and edit the name to have copy at the end
            var copy = charInfo;
            var charName = charInfo.General.Name;
            copy.General.Name = `${charName} Copy`;
            // add that character to the database
            var id = DBFunctions.newCreateNewCharacter(copy, userId, copy.General.Name);
        }

    }, [charInfo]);


    /**
     * Purpose: renders the character component
     * Params/Dependencies:
     * lvl
     * charName
     * userTheme
     * userId
     */
    return (
        <div className="mb-3">
            <InputGroup>
            {/* the character's level */}
                <InputGroup.Text className={""} id="basic-addon3">
                    Level: {lvl}
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
                <Button className={"btn_" + userTheme} onClick={copyChara} variant="outline-secondary" id="button-addon2">
                    Copy
                </Button>
                {/* edit button */}
                <Button className={"btn_" + userTheme} onClick={() => { toSubPage() }} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>
                {/* remove button with confirmation popup */}
                <ConfirmationPopup userTheme={userTheme} content={`Are you sure you want to remove ${charName}? Removing this character will also remove you from the worlds they are in.`} title={`Removing a character...`} id="removeButton" action={{ userId, charId }} name="Remove" type={'removeChara'} />
                {/* print button */}
                <PrintPopup userTheme={userTheme} name={charName} userId={userId} charId={charId} variant="outline-secondary" id="button-addon2" />
            </InputGroup>
        </div>
    );
};

export default Character;