// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ref, update, get, child } from "firebase/database";
import { db } from '../../firebase';
import DBFunctions from '../../utils/firebaseQueries';
import { useEffect } from 'react';
import TypeAhead from '../TypeAhead';
// the JSON object with the character template
const charTemplate = require('../../utils/characterTemplate.json');


/**
 * Purpose: this component is used to display the join code popup
 * Params: 
 * name: string, the name of the world
 * userTheme: string, the user's color theme
 * code: string, the code that the user has typed into the join code input
 * setValidCode: function, used to set the message display for whether a code is valid or not
 * userId: string, the user's id
 * setEnteredCode: function, used to clear the input field when a user enters a correct code
 */
function JoinCodePopup({ name, userTheme, code, setValidCode, userId, setEnteredCode }) {
    // useState that shows and hide the popup
    const [show, setShow] = useState(false);
    // useStates for the characters available for the user
    var [availableCharacters, setAvailableCharacters] = useState();
    // useStates for world information 
    var [worldId, setWorldId] = useState();
    var [worldName, setWorldName] = useState();
    var [owner, setOwner] = useState();
    // useStates that track the selection of a character
    var [premadeChosen, setPremadeChosen] = useState(false);
    var [chosen, setChosen] = useState();
    // useState that tracks whether a code was found
    var [found, setFound] = useState("start");

    // functions that open and close the popup
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //used in page navigation
    const navigate = useNavigate();

    /**
     * Purpose: navigates to the subcharacter page when the user creates a new character, adding the character to that world
     * Params/Dependencies: 
     */
    const navigateToGeneral = () => {
        // get the name of the world that the user is joining
        get(child(ref(db), `Worlds/${worldId}/Name`)).then((snapshot) => {
            // make a new character and update their participation
            var newId = DBFunctions.newCreateNewCharacter(charTemplate, userId, "");
            const updates = {};
            updates[`Characters/${newId}/Participation`] = worldId;
            updates[`CharacterUserRel/${userId}/${newId}/Participation`] = worldId;
            // add this world the the user's world relation
            updates[`WorldUserRel/${userId}/Joined/${worldId}`] = snapshot.val();
            updates[`Worlds/${worldId}/Members/${newId}`] = { "CreatorId": userId};
            update(ref(db), updates);
            // navigate to the subcharacter page and set the character id to this new character
            navigate('/subCharacterPages');
            sessionStorage.setItem("charId", newId);

        }).catch((error) => {
            console.error(error);
        });


    }

    /**
     * Purpose: checks if a world exists with the code that the user has typed
     * Params/Dependencies: 
     * code
     */
    function attemptToJoin() {
        // check that the code isnt empty, so the user can't try with a blank field
        if (code !== "") {
            var there = false;
            // get all of the worlds
            get(child(ref(db), `Worlds`)).then((snapshot) => {
                // go through the worlds and see if the given code matches any of them
                for (const [key, value] of Object.entries(snapshot.val())) {
                    // if a match is found, signal that with there and save the world information for later use
                    if (value.Invite_Code === parseInt(code)) {
                        there = true;
                        setWorldId(key);
                        setOwner(value.CreatorId);
                        setWorldName(value.Name);
                    }
                }
                // if there is still false, then the code isn't valid for any world, so warn the user
                if (there === false) {
                    setFound("not found");
                    setValidCode(<div style={{ color: "red" }}>There are no worlds with this code</div>);
                }
                // if the code is found then trigger the next set of checks
                else {
                    setFound("found")
                }

            }).catch((error) => {
                console.error(error);
            });
        }

    }

    /**
     * Purpose: triggered when a user enters a code for an existing world
     * Params/Dependencies: 
     * found
     */
    useEffect(() => {
        // if the world code has been matched to a world, check if the user is allowed in that world
        if (found === "found") {
            // check if the owner of the world is in their friends list, and if not then warn the user
            get(child(ref(db), `Users/${userId}/Friends/${owner}`)).then((snapshot) => {
                if (snapshot.val() === null) {
                    setValidCode(<div style={{ color: "red" }}>You are not friends with the owner of this world</div>);
                }
                // check if the user has already joined this world, and warn them if they have
                else {
                    get(child(ref(db), `WorldUserRel/${userId}/Joined/${worldId}`)).then((snapshot) => {
                        if (snapshot.val() !== null) {
                            setValidCode(<div style={{ color: "red" }}>You are already in that world</div>);
                        }
                        // get all of the characters related to the user and store them
                        else {
                            get(child(ref(db), `CharacterUserRel/${userId}`)).then((snapshot) => {
                                setAvailableCharacters(snapshot.val());

                            }).catch((error) => {
                                console.error(error);
                            });
                            // clear any unneeded information and and show the popup
                            setFound("start");
                            setEnteredCode("");
                            setAvailableCharacters();
                            handleShow();
                        }
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        // warn the user that the world doesn't exist if the code doesn't match any worlds
        else if (found === "not found") {
            setValidCode(<div style={{ color: "red" }}>There are no worlds with this code</div>);
        }

    }, [found]);


    /**
     * Purpose: this is triggered when the user tries to confirm their character selection to join a world
     * Params/Dependencies: 
     * userId
     * premadeChosen
     * worldId
     * worldName
     */
    function handleConfirm() {
        // check that the user has selected a character from the typeahead, warn them if not
        if (premadeChosen === false) {
            setChosen(<div style={{ color: "red" }}>You havent chosen a character yet.</div>);
        }
        // add this user to the world and update the character participating, link the world to the user
        else {
            const updates = {};
            updates[`Characters/${premadeChosen.key}/Participation`] = worldId;
            updates[`CharacterUserRel/${userId}/${premadeChosen.key}/Participation`] = worldId;
            updates[`Worlds/${worldId}/Members/${premadeChosen.key}`] = { "CreatorId": userId, "Name": premadeChosen.value };
            updates[`WorldUserRel/${userId}/Joined/${worldId}`] = worldName;
            update(ref(db), updates);
            // clear everything just in case and close the popup
            setEnteredCode("");
            setValidCode();
            handleClose();
        }
    }

    /**
     * Purpose: renders the joincode popup
     * Params/Dependencies: 
     * userTheme
     * name
     * chosen
     */
    return (
        <>
            {/* the button that triggers the popup */}
            <Button className={"btn_" + userTheme} variant="primary" onClick={attemptToJoin}>
                Join
            </Button>
            {/* the popup  */}
            <Modal show={show} onHide={handleClose}>
                {/* the header contains the name of the world */}
                <Modal.Header className={"body_" + userTheme} closeButton>
                    <Modal.Title>Welcome to {name}</Modal.Title>
                </Modal.Header>
                {/* the body with 2 options for choosing a character: */}
                <Modal.Body className={"body_" + userTheme}>
                    <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form.Group className="mb-3" controlId="ChooseCharacter">
                            {/* message section used to warn the user */}
                            {chosen}
                            <Row>
                                <Col>
                                    {/* choosing an existing one from a typeahead (from the players character list) */}
                                    <Form.Label>Choose an existing character</Form.Label>
                                    <TypeAhead setPremadeChosen={setPremadeChosen} action={"choose character"} optionInfo={availableCharacters}></TypeAhead>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* creating a new character, this brings the user to the general sub character page */}
                                    <Form.Label >Create a new character</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                {/* the button that navigates to the sub character page with the new character */}
                                <Col>
                                    <Button className={"btn_" + userTheme} onClick={navigateToGeneral}>Create New</Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Container>

                </Modal.Body>
                {/* the popup footer with the cancel and confirm buttons */}
                <Modal.Footer className={"body_" + userTheme}>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className={"btn_" + userTheme} onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default JoinCodePopup;