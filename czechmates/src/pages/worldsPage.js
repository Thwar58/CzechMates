
import React from "react";
import World from "../components/World";
import JoinCodePopup from "../components/JoinCodePopup";
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useEffect } from "react";
import { db } from '../firebase';
import { ref, onValue, set } from "firebase/database";
import { useState } from "react";
import AddWorldPopup from "../components/AddWorldPopup";
import NavWithDD from '../components/NavWithDropdown';

// this is the world page
// input: the user id 
const WorldPage = ({ userId, userTheme }) => {

    // variables to track the world information and the loading state
    var [worldInfo, setWorldInfo] = useState();
    var [worlds, setWorlds] = useState([]);
    var [worldDisplay, setWorldDisplay] = useState();
    const [loading, setLoading] = useState(true);
    var [enteredCode, setEnteredCode] = useState("");
    var [validCode, setValidCode] = useState();


    // query the database for the user's worlds when the userid changes
    useEffect(() => {
        if (userId !== undefined) {
            // console.log(userId);
            const worldsRef = ref(db, 'WorldUserRel/' + userId);
            // onvalue monitors the database for changes
            onValue(worldsRef, (snapshot) => {
                setWorldInfo(snapshot.val());
                // console.log(snapshot.val());
            });
        }

    }, [userId]);

    useEffect(() => {
        if (userTheme === 'dark') {
            var btnElements = document.querySelectorAll('.btn');
            btnElements.forEach(function (btn) {
                // Add a new class "newClass" to each button element
                btn.classList.add('dark');
            });
            // updates[`Users/${userId}/Light_Mode`] = userTheme;
        } else {
            var btnElements = document.querySelectorAll('.btn');
            btnElements.forEach(function (btn) {
                // Add a new class "newClass" to each button element
                btn.classList.add('light');
            });
        }
    }, []);

    // loop through the worlds and create components for them
    useEffect(() => {
        if (worldInfo !== undefined && worldInfo !== null) {
            // console.log(worldInfo);
            var arr = [];
            if (worldInfo.Created !== undefined) {
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(worldInfo.Created)) {
                    arr.push(<World userTheme={userTheme} key={key} userId={userId} worldId={key} worldName={value} type={"created"} > </World>);
                }
            }
            if (worldInfo.Joined !== undefined) {
                for (const [key, value] of Object.entries(worldInfo.Joined)) {
                    arr.push(<World userTheme={userTheme} key={key} userId={userId} worldId={key} worldName={value} type={"joined"} > </World>);
                }
            }
            console.log("after both looped");
            setWorlds(arr);

        }
        else {
            setWorlds(<h1>You have no worlds yet</h1>)
        }

    }, [worldInfo, userTheme]);

    // set the loading state to false if the data is loaded
    useEffect(() => {
        if (worldInfo !== undefined) {
            setLoading(false);
        }
        // console.log(worldInfo);
    }, [worldInfo]);

    useEffect(() => {
        if (worlds !== undefined) {
            setWorldDisplay(worlds);
        }
        // console.log(worldInfo);
    }, [worlds]);

    useEffect(() => {
        // console.log(enteredCode);
    }, [enteredCode]);


    // render the blank loading screen if loading is true
    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10 fullWindow">
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 className={"text-center label_" + userTheme}>
                            World List
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* dropdown for world sorting options */}
                    <Col md={5}>
                        {/* <DropDownShowsValue chars={chars} setChars={setChars} type={"character"} text="Order by..." actions={["level", "recently used", "alphabetically"]} /> */}
                        <DropDownShowsValue userTheme={userTheme} type={"world"} worlds={worlds} worldDisplay={worldDisplay} setWorldDisplay={setWorldDisplay} text="Order by..." actions={["Owned", "Participating", "Alphabetically"]} />
                    </Col>
                    <Col style={{ textAlign: "center" }} md={7}>
                        {validCode}
                        {/* the invite code input section */}
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                Invite Code
                            </InputGroup.Text>

                            {/* input the value and disable the input */}
                            <Form.Control
                                placeholder="Enter Code"
                                disabled={false}
                                value={enteredCode}
                                onChange={e => {setEnteredCode(e.target.value); setValidCode();} }
                            />
                            {/* first button */}

                            <JoinCodePopup setEnteredCode={setEnteredCode} setValidCode={setValidCode} code={enteredCode} userTheme={userTheme} name={"World Name"} userId={userId} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <div>
                        {
                            worldDisplay
                        }
                    </div>
                    {/* this brings up the modal for creating a world */}

                </Row>
                <Row>
                    <Col>
                        {/* function MWPopup({ title, userId, button, worldId }) { */}
                        <AddWorldPopup userTheme={userTheme} userId={userId} title="World Name" button={"Add World"} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WorldPage;