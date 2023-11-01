
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// this component houses the content for the general character info
const GeneralPage = () => {
    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            General
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col style={{borderStyle: "solid", textAlign: "center"}}>
                        {/* future: actually have an image here not a placeholder */}
                        <p>Image here</p>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        <InputWithLabel label={"Name"} placeholder={"Type here"} disabled={false} />
                        <InputWithLabel label={"High Concept"} placeholder={"Type here"} disabled={false} />
                    </Col>
                </Row>

                {/* future: generate dynamically instead of hardcoding */}
                {/* each one is editable and has a label as well as a placeholder value */}

                <InputWithLabel label={"Trouble"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Aspect 1"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Aspect 2"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Fate Points"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Money"} placeholder={"Type here"} disabled={false} />
                {/* the description section is labeled individually */}
                <Form.Label htmlFor="this">Description</Form.Label>
                <InputWithLabel label={"Physical Appearance"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Background"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Major Relationships"} placeholder={"Type here"} disabled={false} />
                <InputWithLabel label={"Other"} placeholder={"Type here"} disabled={false} />



            </Container>


        </div>
    );
};

export default GeneralPage;