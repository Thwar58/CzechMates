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
import { child, get, ref, set, push, onValue } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import '../themes.css'


// the character component
// input: the character name, the character id, the user id, and the character information 
const Character = ({ charName, charId, userId }) => {



    // used in page navigations
    const navigate = useNavigate();
    var [charInfo, setCharInfo] = useState();


    // this function redirects the user to the subcharacter page while also passing the character id through the state
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const toSubPage = () => {
        navigate('/subCharacterPages', { state: { charId: charId } });
    }

    // this function copies the character in this component
    // it is added to the database with an automatically generated unique key
    // the UI is updates automatically
    const copyChara = event => {
        if (charId !== undefined){
            const charRef = ref(db, 'Characters/' + charId);
            onValue(charRef, (snapshot) => {
                console.log(snapshot.val());
                setCharInfo(snapshot.val());
            });
        }
    }

    const onAddBtnClick = event => {
        DBFunctions.writeCharacterData("User1", "CharID3", "test", "concept");
    };

    useEffect(() => {
        if (charInfo !== undefined){
            console.log("check char info ", charInfo);
            var copy = charInfo;
            var charName = charInfo.General.Name;
            copy.General.Name = `${charName} Copy`;
            console.log("check copy ", copy);
            var id = DBFunctions.newCreateNewCharacter(copy, userId, copy.General.Name);
            // navigate('/subCharacterPages', { state: { charId: id } });
            // console.log(userId, newId, copy.General.Name);
            // DBFunctions.updateRel(userId, newId, copy.General.Name);
        }

    }, [charInfo]);

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
                <PrintPopup name={charName} userId={userId} charId={charId} variant="outline-secondary" id="button-addon2"/>
            </InputGroup>
        </div>
    );
};

export default Character;