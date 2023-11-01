
import React from "react";
import AttributesComp from "../components/AttributesComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// this component houses the content for the character attributes
const AttributesPage = () => {
    return (
        <div>

            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Attributes
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AttributesComp value={"5"} name={"Awareness"} />
                        <AttributesComp value={"5"} name={"Charisma"} />
                        <AttributesComp value={"5"} name={"Defense"} />
                        <AttributesComp value={"5"} name={"Endurance"} />
                        <AttributesComp value={"5"} name={"Health"} />
                        <AttributesComp value={"5"} name={"Knowledge"} />
                        <AttributesComp value={"5"} name={"Magic Attack"} />
                        <AttributesComp value={"5"} name={"Magic Defense"} />
                    </Col>
                    <Col>
                        <AttributesComp value={"5"} name={"Magic Heal"} />
                        <AttributesComp value={"5"} name={"Magic Reach"} />
                        <AttributesComp value={"5"} name={"Melee Attack"} />
                        <AttributesComp value={"5"} name={"Ranged Attack"} />
                        <AttributesComp value={"5"} name={"Max Action Points (AP)"} />
                        <AttributesComp value={"5"} name={"Max Vigor"} />
                        <AttributesComp value={"5"} name={"Max Resolve"} />
                        <AttributesComp value={"5"} name={"Magic Range"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-12 col-sm-10 col-md-7 col-lg-7">
                        <AttributesComp value={"5"} name={"Movement"} />
                    </Col>
                    <Col>
                    </Col>

                </Row>
            </Container>

            {/* future: split into two sections (ref. Func. Spec.) */}
            {/* future: generate dynamically instead of hardcoding */}



        </div>
    );
};

export default AttributesPage;