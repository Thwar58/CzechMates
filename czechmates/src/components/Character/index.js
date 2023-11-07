// https://codesandbox.io/s/infinite-component-onclick-oery4?file=/src/index.js:418-430

import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import DBFunctions from "../../utils/firebaseQueries";


// the character component
const Character = ({ charName, charId, userId, charInfo }) => {
    // handle page navigations
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const toSubPage=()=>{
        navigate('/subCharacterPages',{state:{charId:charId}});
          }

    const copyChara = event => {
        // console.log(charInfo);
        var copy = charInfo;
        copy.General.Name = `${charName} Copy`;
        console.log(copy);
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
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3">
                        Character
                    </InputGroup.Text>
                    {/* input the value and disable the input */}
                    <Form.Control
                        value={charName}
                        // disabled={true}
                        readOnly={true}
                        onClick={()=>{toSubPage()}}
                    />
                    {/* first button */}
                    <Button onClick={copyChara} variant="outline-secondary" id="button-addon2">
                        Copy
                    </Button>
                    {/* second button */}
                    <Button onClick={()=>{toSubPage()}} variant="outline-secondary" id="button-addon2">
                        Edit
                    </Button>
                    <ConfirmationPopup id="removeButton" name="Remove" />
                    <Button variant="outline-secondary" id="button-addon2" onClick={printChar}>
                        Print
                    </Button>
                </InputGroup>
            </>
        </div>
    );
};

export default Character;