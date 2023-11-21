
import React from "react";
import World from "../components/World";
import ManageWorldPopup from '../components/ManageWorldPopup';
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

// this is the world page
// input: the user id
const WorldPage = ({ userId }) => {

    // variables to track the world information and the loading state
    var [worldInfo, setWorldInfo] = useState();
    var [worlds, setWorlds] = useState([]);
    const [loading, setLoading] = useState(true);

    // query the database for the user's worlds when the userid changes
    useEffect(() => {
        if (userId !== undefined){
            console.log(userId);
            const worldsRef = ref(db, 'WorldUserRel/' + userId);
            // onvalue monitors the database for changes
            onValue(worldsRef, (snapshot) => {
                setWorldInfo(snapshot.val());
                console.log(snapshot.val());
            });
        }

    }, [userId]);

    // loop through the worlds and create components for them
    useEffect(() => {
        if (worldInfo !== undefined) {
            var arr = [];
             // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(worldInfo.Created)) {
            arr.push(<World key={key} worldName={value} members={"mems"} > </World>);
        }
        for (const [key, value] of Object.entries(worldInfo.Joined)) {
            arr.push(<World key={key} worldName={value} members={"mems"} > </World>);
        }
            setWorlds(arr);
        }

    }, [worldInfo]);

    // set the loading state to false if the data is loaded
    useEffect(() => {
        if (worldInfo !== undefined) {
            setLoading(false);
        }
        console.log(worldInfo);
    }, [worldInfo]);


    // render the blank loading screen if loading is true
    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            World List
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* dropdown for world sorting options */}
                    <Col md={5}>
                        <DropDownShowsValue text="Order by..." actions={["Owned", "Participating", "Alphabetically"]} />
                    </Col>
                    <Col style={{ textAlign: "right" }} md={7}>
                        {/* the invite code input section */}
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon3">
                                Invite Code
                            </InputGroup.Text>
                            {/* input the value and disable the input */}
                            <Form.Control
                                placeholder="Enter Code"
                                disabled={false}
                            />
                            {/* first button */}
                            <JoinCodePopup name={"World Name"} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <div>
                        {
                            worlds
                        }
                    </div>
                    {/* this brings up the modal for creating a world */}
                    <Col>
                        <ManageWorldPopup title="World Name" button={"Plus Sign"} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WorldPage;