
import React, { useEffect, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavWithDD from '../components/NavWithDropdown';
import { db } from '../firebase';
import { child, get, ref, set, push, update, onValue } from "firebase/database";
import InputGroup from 'react-bootstrap/InputGroup';



// this component houses the content for the general character info
// input the general character information, the user id and the character id
const GeneralPage = ({participation, generalInfo, userId, charId, userTheme }) => {

    var [ imgSrc, setImgSrc ] = useState(generalInfo.ImageURL);

    function setPic(newImg){
        setImgSrc(newImg);
        console.log(newImg);
        var userRef = ref(db);
        const updates = {};
        updates['Characters/'+charId+'/General/ImageURL'] = newImg;
        update(userRef, updates);
    }



    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12 fullWindow">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 className={"text-center body_"+userTheme}>
                            General
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                    Image URL
                </InputGroup.Text>
                <Form.Control
                    value={imgSrc}
                    placeholder={`Enter the Image URL`}
                    onChange={(e)=>{setPic(e.target.value)}}
                />
            </InputGroup>
                        <img style={{ textAlign: "center", borderStyle: "solid" }} width='200vh' src={imgSrc}/>
                    </Col>
                    <Col className="col-sm-8 col-md-8 col-lg-8">
                        <InputWithLabel participation={participation} charId={charId} userId={userId} category={"General"} label={"Name"} content={generalInfo?.Name} disabled={false} />
                        <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Level"} content={generalInfo?.Level} disabled={true} />
                        <InputWithLabel tooltip={true} charId={charId} userId={userId} category={"General"} label={"High Concept"} content={generalInfo?.High_Concept} disabled={false} />
                    </Col>
                </Row>
                {/* each one is editable and has a label as well as a placeholder value */}
                <InputWithLabel tooltip={true} charId={charId} userId={userId} category={"General"} label={"Trouble"} content={generalInfo?.Trouble} disabled={false} />
                <InputWithLabel tooltip={true} charId={charId} userId={userId} category={"General"} label={"Aspect 1"} content={generalInfo?.Aspect_1} disabled={false} />
                <InputWithLabel tooltip={true} charId={charId} userId={userId} category={"General"} label={"Aspect 2"} content={generalInfo?.Aspect_2} disabled={false} />
                <InputWithLabel tooltip={true} charId={charId} userId={userId} category={"General"} label={"Fate Points"} content={generalInfo?.Fate_Points} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Money"} content={generalInfo?.Money} disabled={false} />
                {/* the description section is labeled individually */}
                <Form.Label htmlFor="this">Description</Form.Label>
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Physical Appearance"} content={generalInfo?.Physical_Appearance} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Background"} content={generalInfo?.Background} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Major Relationships"} content={generalInfo?.Major_Relationships} disabled={false} />
                <InputWithLabel charId={charId} userId={userId} category={"General"} label={"Other"} content={generalInfo?.Other} disabled={false} />
            </Container>
        </div>
    );
};

export default GeneralPage;