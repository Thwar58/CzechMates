
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
const WorldPage = ({ userId }) => {


    var [worldInfo, setWorldInfo] = useState("");
    var [worlds, setWorlds] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const worldsRef = ref(db, 'Worlds/' + userId);
        onValue(worldsRef, (snapshot) => {
            // var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            // Object.values(snapshot.val()).forEach(val =>arr.push(val));
            // setWorldInfo(arr);
            setWorldInfo(snapshot.val());
        });

    }, [userId]);

    useEffect(() => {
        if (worldInfo !== "") {
            var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            Object.values(worldInfo.Created).forEach(val =>
                arr.push(<World key={val.Name} worldName={val.Name} members={val.Members} > </World>));

            setWorlds(arr);

        }

    }, [worldInfo]);

    useEffect(() => {
        if (worldInfo !== "") {
            // console.log("final check ", userInfo);
            setLoading(false);
        }
        // console.log(charInfo);
    }, [worldInfo]);



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