
import React, { useEffect } from "react";
import SkillsComp from "../components/SkillsComp";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";



// this component houses the content for the character skills
const SkillsPage = ({ skillInfo, charId, userId }) => {
    console.log(skillInfo);

    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);

    useEffect(() => {
        if (skillInfo !== undefined) {
            console.log(skillInfo);
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(skillInfo)) {
                // console.log(`${key}: `, value);
                arr.push(<SkillsComp key={key} userId={userId} charId={charId} value={value ?? "Loading..."} name={key} />);
            }
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
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