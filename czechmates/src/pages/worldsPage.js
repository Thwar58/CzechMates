
import React from "react";
import World from "../components/World";
import ManageWorldPopup from '../components/ManageWorldPopup';
import JoinCodePopup from "../components/JoinCodePopup";
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// this is the world page
const WorldPage = () => {

    return (
        <div>


            {/* future: generage dynamically instead of hardcoding 
            its too much trouble doing this in a faked way, wait until
            we are actually pulling data from the database to handle it*/}
            <Container fluid="md" className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <Row>
                   
                   <Col>
                   </Col>
                    <Col>
                    <h1 style={{ color: "green" }}>
                        World List
                    </h1>

                    </Col>
                    <Col>
                    </Col>
                   
                    

                </Row>
                <Row>
                    {/* dropdown for world sorting options */}
                    <Col>
                    <DropDownShowsValue text="Order by..." actions={["Owned", "Participating", "Alphabetically"]} />
                    </Col>
                    <Col style={{textAlign: "right"}} md={7}>
                    {/* the invite code input section */}
                    <p>Invite Code
                        <input type="text" placeholder="enter code here" />
                        {/* the button triggers the join from code modal */}
                        <JoinCodePopup name={"World Name"} />
                    </p>
                    </Col>
                </Row>
                <Row>
                <World worldName={"filler name"} />
                    <World worldName={"filler name 2"} />
                    <World worldName={"filler name 3"} />
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