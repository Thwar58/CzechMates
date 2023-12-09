// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import DropDownShowsValue from '../DropDownShowsValue';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ref, onValue, update, get, child } from "firebase/database";
import { db } from '../../firebase';
import DBFunctions from '../../utils/firebaseQueries';
import { useEffect } from 'react';
import TypeAhead from '../TypeAhead';

const charTemplate = require('../../utils/characterTemplate.json');

// a component for the modal when you try to join a world from a code, you pass in the world name
function JoinCodePopup({ name, userTheme, code, setValidCode, userId }) {
    // set the initial state to be hidden
    const [show, setShow] = useState(false);
    var [availableCharacters, setAvailableCharacters] = useState();
    var [worldId, setWorldId] = useState();
    var [premadeChosen, setPremadeChosen] = useState(false);
    var [chosen, setChosen] = useState();
    var [found, setFound] = useState("start");
    var [owner, setOwner] = useState();

    // functions that open and close the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // dummy character data data
    // const dummyCharacters = ["Char 1", "Char 2", "Char 3"];

    //handles page navigation
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPages
        navigate('/subCharacterPages');
        // console.log("char info ", charInfo);
        // console.log("chars ", chars);
        var newId = DBFunctions.newCreateNewCharacter(charTemplate, userId, "");
        // set their participation to this world here
        const updates = {};
        updates[`Characters/${newId}/Participation`] = worldId;
        updates[`CharacterUserRel/${userId}/${newId}/Participation`] = worldId;
        // test -NjZ_pgPtqBp2LGYqcIN
        update(ref(db), updates);
        sessionStorage.setItem("charId", newId);
    }

    function attemptToJoin() {
        console.log("entered code", code);
        // Step 1: check if any of the worlds have this code
        var there = false;
        get(child(ref(db), `Worlds`)).then((snapshot) => {
            for (const [key, value] of Object.entries(snapshot.val())) {
                // need to check if they are already in the world as well ahhh
                if (value.Invite_Code === code) {
                    there = true;
                    setWorldId(key);
                    setOwner(value.CreatorId);
                }
            }
            if (there === false) {
                setFound("not found");
            }
            else {
                setFound("found")
            }


        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        console.log("found has changed ", found);
        if (found === "found") {
            get(child(ref(db), `Users/${userId}/Friends/${owner}`)).then((snapshot) => {
                if (snapshot.val() === null) {
                    console.log("they aren't friends")
                    setValidCode(<div style={{ color: "red" }}>You are not friends with the owner of this world</div>);
                }
                else {
                    console.log("they are friends")
                    // check if theyre already in the world here
                    var worldRef = ref(db, `WorldUserRel/${userId}/Joined/${worldId}`)
                    onValue(worldRef, (snapshot) => {
                        if (snapshot.val() !== null) {
                            setValidCode(<div style={{ color: "red" }}>You are already in that world</div>);
                        }
                        else {
                            var charRef = ref(db, `CharacterUserRel/${userId}`)
                            // var notParticipating = [];
                            onValue(charRef, (snapshot) => {
                                setAvailableCharacters(snapshot.val());
                            });
                            // 
                            handleShow();
                        }

                    });


                }

            }).catch((error) => {
                console.error(error);
            });

        }
        else if (found === "not found") {
            setValidCode(<div style={{ color: "red" }}>There are no worlds with this code</div>);
        }

    }, [found]);



    function handleConfirm() {
        console.log("confirmed");
        // check character selected
        if (premadeChosen === false) {
            console.log("no character chosen, don't close");
            setChosen(<div style={{ color: "red" }}>You havent chosen a character yet.</div>);
        }
        else {
            console.log(premadeChosen);
            const updates = {};
            updates[`Characters/${premadeChosen.key}/Participation`] = worldId;
            updates[`CharacterUserRel/${userId}/${premadeChosen.key}/Participation`] = worldId;
            updates[`Worlds/${worldId}/Members/${premadeChosen.key}`] = {"CreatorId": userId, "Name": premadeChosen.value}
            console.log(updates);
            // change character participation value
            // change world members list
            handleClose();
        }
    }

    // console.log(userTheme);

    return (
        <>
            {/* the button that triggers the modal */}
            <Button className={"btn_" + userTheme} variant="primary" onClick={attemptToJoin}>
                Join
            </Button>
            {/* the modal  */}
            <Modal show={show} onHide={handleClose}>
                {/* the header contains the name of the world */}
                <Modal.Header className={"body_" + userTheme} closeButton>
                    <Modal.Title>Welcome to {name}</Modal.Title>
                </Modal.Header>
                {/* the body with 2 options for choosing a character: */}
                <Modal.Body className={"body_" + userTheme}>
                    <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <Form.Group className="mb-3" controlId="ChooseCharacter">
                            {chosen}
                            <Row>
                                <Col>
                                    {/* choosing an existing one from a dropdown (from the players character list) */}
                                    <Form.Label>Choose an existing character</Form.Label>
                                    {/* <DropDownShowsValue type={"availableCharacters"} userTheme={userTheme} text={dropdownText} actions={availableCharacters} /> */}
                                    <TypeAhead setPremadeChosen={setPremadeChosen} action={"choose character"} optionInfo={availableCharacters}></TypeAhead>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {/* future: we can move the button under the label with css */}
                                    {/* creating a new character, this brings the user to the general sub character page */}
                                    <Form.Label >Create a new character</Form.Label>

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button className={"btn_" + userTheme} onClick={navigateToGeneral}>Create New</Button>
                                </Col>
                            </Row>

                        </Form.Group>
                    </Container>

                </Modal.Body>
                {/* the modal footer with the closing buttons */}
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