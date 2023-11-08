
import React, { useEffect } from "react";
import SkillsComp from "../components/SkillsComp";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";



// this component houses the content for the character skills
// input: the skill information for a character, the character id, and the user id
const SkillsPage = ({ skillInfo, charId, userId }) => {

    // variables to track the skills and position them
    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);

    // when the skills information changes, this is triggered
    useEffect(() => {
        if (skillInfo !== undefined) {
            // loop through all the character's skills and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(skillInfo)) {
                // console.log(`${key}: `, value);
                arr.push(<SkillsComp key={key} userId={userId} charId={charId} value={value ?? "Loading..."} name={key} />);
            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeft(left);
            setRight(right);
        }

    }, [skillInfo]);

    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Skills
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* the acutal positioning of the skill components */}
                    <Col>
                        {left}
                    </Col>
                    <Col>
                        {right}
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default SkillsPage;