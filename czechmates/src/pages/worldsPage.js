
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
import { ref, onValue } from "firebase/database";
import { useState } from "react";
import AddWorldPopup from "../components/AddWorldPopup";

/**
 * Purpose: this page is for the worlds owned by the user
 * Params: 
 * userId: string, the user's id
 * userTheme: string, the user's color theme
 */
const WorldPage = ({ userId, userTheme }) => {

    // variables to track the world information 
    var [worldInfo, setWorldInfo] = useState();

    // the array of world components that will be displayed
    var [worlds, setWorlds] = useState([]);

    // the way the worlds are ordered based off the sorting drop down
    var [worldDisplay, setWorldDisplay] = useState();

    // tells whether the page is still waiting and getting the information 
    const [loading, setLoading] = useState(true);

    // the join code being used to attempt to join a world
    var [enteredCode, setEnteredCode] = useState("");

    // used to decide what message to display if the join code is valid or not
    var [validCode, setValidCode] = useState();


    /**
     * Purpose: load in the world info when the userId changes or if the worldsRef changes value
     * Params/Dependencies: 
     * userIdd
     */
    useEffect(() => {
        if (userId !== undefined) {
            const worldsRef = ref(db, 'WorldUserRel/' + userId);
            // onvalue monitors the database for changes
            onValue(worldsRef, (snapshot) => {
                setWorldInfo(snapshot.val());
            });
        }

    }, [userId]);

    /**
     * Purpose: when a new world is added, it rerenders all the world components and puts them back in the worlds array
     * Params/Dependencies: 
     * worldInfo
     * userTheme - only a dependency so that when the theme changes the components rerender with the correct theme
     */
    useEffect(() => {
        if (worldInfo !== undefined && worldInfo !== null) {
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
            setWorlds(arr);
        }
        else {
            setWorlds(<h3>You have no worlds yet</h3>)
        }

    }, [worldInfo, userTheme]);

    /**
     * Purpose: If the worldsInfo has a value then the page is not loading anymore
     * Params/Dependencies: 
     * worldInfo
     */
    useEffect(() => {
        if (worldInfo !== undefined) {
            setLoading(false);
        }
    }, [worldInfo]);

    /**
     * Purpose: on render if the worlds has a value then we give the worldsdisplay a value as well
     * Params/Dependencies: 
     * worlds
     */
    useEffect(() => {
        if (worlds !== undefined) {
            setWorldDisplay(worlds);
        }
    }, [worlds]);

    /**
     * Purpose: sets to render nothing if the variable is set only when there is no worldsinfo data
     * Params/Dependencies: 
     * loading
     */
    if (loading) {
        return (
            <div></div>
        )
    }

    /**
     * Purpose: renders the worlds page
     * Params/Dependencies: 
     * userTheme
     * worldDisplay
     * userId
     */
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
                        <AddWorldPopup userTheme={userTheme} userId={userId} title="World Name" button={"Add World"} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WorldPage;