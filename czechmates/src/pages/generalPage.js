
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// this component houses the content for the general character info
const GeneralPage = ({ generalInfo }) => {

    console.log("check info ", generalInfo);
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
                    <Col style={{ borderStyle: "solid", textAlign: "center" }}>
                        {/* future: actually have an image here not a placeholder */}
                        <p>Image here</p>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        <InputWithLabel category={"General"} label={"Name"} content={generalInfo?.Name} disabled={false} />
                        <InputWithLabel category={"General"} label={"High Concept"} content={generalInfo?.High_Concept} disabled={false} />
                    </Col>
                </Row>
                {/* each one is editable and has a label as well as a placeholder value */}
                <InputWithLabel category={"General"} label={"Trouble"} content={generalInfo?.Trouble} disabled={false} />
                <InputWithLabel category={"General"} label={"Aspect 1"} content={generalInfo?.Aspect_1} disabled={false} />
                <InputWithLabel category={"General"} label={"Aspect 2"} content={generalInfo?.Aspect_2} disabled={false} />
                <InputWithLabel category={"General"} label={"Fate Points"} content={generalInfo?.Fate_Points} disabled={false} />
                <InputWithLabel category={"General"} label={"Money"} content={generalInfo?.Money} disabled={false} />
                {/* the description section is labeled individually */}
                <Form.Label htmlFor="this">Description</Form.Label>
                <InputWithLabel category={"General"} label={"Physical Appearance"} content={generalInfo?.Physical_Appearance} disabled={false} />
                <InputWithLabel category={"General"} label={"Background"} content={generalInfo?.Background} disabled={false} />
                <InputWithLabel category={"General"} label={"Major Relationships"} content={generalInfo?.Major_Relationships} disabled={false} />
                <InputWithLabel category={"General"} label={"Other"} content={generalInfo?.Other} disabled={false} />
            </Container>
        </div>
    );
};

export default GeneralPage;