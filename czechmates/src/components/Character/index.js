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
import SheetPage from "../../pages/sheetPage";
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";



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
        if (charId !== undefined) {
            const charRef = ref(db, 'Characters/' + charId);
            onValue(charRef, (snapshot) => {
                // console.log(snapshot.val());
                setCharInfo(snapshot.val());
            });
        }
    }

    useEffect(() => {
        if (charInfo !== undefined) {
            // console.log("check char info ", charInfo);
            var copy = charInfo;
            var charName = charInfo.General.Name;
            copy.General.Name = `${charName} Copy`;
            // console.log("check copy ", copy);
            var id = DBFunctions.newCreateNewCharacter(copy, userId, copy.General.Name);
            // navigate('/subCharacterPages', { state: { charId: id } });
            // console.log(userId, newId, copy.General.Name);
            // DBFunctions.updateRel(userId, newId, copy.General.Name);
        }

    }, [charInfo]);

    const options = {
        filename: "advanced-example.pdf",
        method: "save",
        // default is Resolution.MEDIUM = 3, which should be enough, higher values
        // increases the image quality but also the size of the PDF, so be careful
        // using values higher than 10 when having multiple pages generated, it
        // might cause the page to crash or hang.
        resolution: Resolution.EXTREME,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.SMALL,
            // default is 'A4'
            format: "letter",
            // default is 'portrait'
            orientation: "landscape"
        },
        canvas: {
            // default is 'image/jpeg' for better size performance
            mimeType: "image/jpeg",
            qualityRatio: 1
        },
        // Customize any value passed to the jsPDF instance and html2canvas
        // function. You probably will not need this and things can break,
        // so use with caution.
        overrides: {
            // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
            pdf: {
                compress: true
            },
            // see https://html2canvas.hertzen.com/configuration for more options
            canvas: {
                useCORS: true
            }
        }
    };

    // you can also use a function to return the target element besides using React refs
    const getTargetElement = () => document.getElementById("container");

    const downloadPdf = () => generatePDF(getTargetElement, options);


    function printChar() {

        const printWindow = window.open('', '', 'width=800,height=600');
        const htmlContent = `
        <div>
        <SheetPage sheetInfo={charInfo} />
        </div>
  `;

        // Set the content of the new window to the CSV data
        printWindow.document.open();
        printWindow.document.write(htmlContent);
        printWindow.document.close();

        // Trigger the print dialog
        printWindow.print();
    }

    const removeOrEdit = event => {
        // DBFunctions.removeFromDB('Characters/User1/CharID3/General');
        DBFunctions.editInDB('Characters/User1/CharID3/General/Name', "test2");
        // DBFunctions.removeFromDB('Users/User1/Followers/User7');
        // const updates = {};
        // updates['User/'] = "New Name";
        // updates['Characters'] = "New Name";
        // DBFunctions.updateMultPlaces(updates);

    };

  


    // return a div with the character name and buttons for each option
    return (
        <div>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3" className="header">
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
                <ConfirmationPopup content={`Are you sure you want to remove ${charName}? Removing this character will also remove you from the worlds they are in.`} title={`Removing a character...`} id="removeButton" action={{ userId, charId }} name="Remove" type={'removeChara'} />
                {/* print button */}
                <PrintPopup name={charName} userId={userId} charId={charId} variant="outline-secondary" id="button-addon2" />
            </InputGroup>
        </div>
    );
};

export default Character;