
import React from "react";
import AttributesComp from "../components/AttributesComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// this component houses the content for the character attributes
const AttributesPage = ({attrInfo}) => {
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
                        <AttributesComp value={attrInfo?.Awareness ?? "Loading..."} name={"Awareness"} />
                        <AttributesComp value={attrInfo?.Charisma ?? "Loading..."} name={"Charisma"} />
                        <AttributesComp value={attrInfo?.Defense ?? "Loading..."} name={"Defense"} />
                        <AttributesComp value={attrInfo?.Endurance ?? "Loading..."} name={"Endurance"} />
                        <AttributesComp value={attrInfo?.Health ?? "Loading..."} name={"Health"} />
                        <AttributesComp value={attrInfo?.Knowledge ?? "Loading..."} name={"Knowledge"} />
                        <AttributesComp value={attrInfo?.Magic_Attack ?? "Loading..."} name={"Magic Attack"} />
                        <AttributesComp value={attrInfo?.Magic_Defense ?? "Loading..."} name={"Magic Defense"} />
                    </Col>
                    <Col>
                        <AttributesComp value={attrInfo?.Magic_Heal ?? "Loading..."} name={"Magic Heal"} />
                        <AttributesComp value={attrInfo?.Magic_Reach ?? "Loading..."} name={"Magic Reach"} />
                        <AttributesComp value={attrInfo?.Melee_Attack ?? "Loading..."} name={"Melee Attack"} />
                        <AttributesComp value={attrInfo?.Ranged_Attack ?? "Loading..."} name={"Ranged Attack"} />
                        <AttributesComp value={attrInfo?.Max_Action_Points_AP ?? "Loading..."} name={"Max Action Points (AP)"} />
                        <AttributesComp value={attrInfo?.Max_Vigor ?? "Loading..."} name={"Max Vigor"} />
                        <AttributesComp value={attrInfo?.Max_Resolve ?? "Loading..."} name={"Max Resolve"} />
                        <AttributesComp value={attrInfo?.Magic_Range ?? "Loading..."} name={"Magic Range"} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-12 col-sm-10 col-md-7 col-lg-7">
                        <AttributesComp value={attrInfo?.Movement ?? "Loading..."} name={"Movement"} />
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