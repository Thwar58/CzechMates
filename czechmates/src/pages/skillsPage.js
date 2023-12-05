
import React, { useEffect } from "react";
import SkillsComp from "../components/SkillsComp";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import TextareaPage from "../components/TextArea";
import NavWithDD from '../components/NavWithDropdown';



// this component houses the content for the character skills
// input: the skill information for a character, the character id, and the user id
const SkillsPage = ({ skillInfo, charId, attrInfo, level, userTheme }) => {

    // variables to track the skills and position them
    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);
    var [learnedAbilties, setLearnedAbilities] = useState([]);

    // when the skills information changes, this is triggered
    useEffect(() => {
        if (skillInfo !== undefined) {
            // loop through all the character's skills and make components for them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(skillInfo)) {
                if (key == "Learned_Abilities") {
                    setLearnedAbilities([<TextareaPage charId={charId} key={"Learned Abilities"} disabled={false} content={value} title={"Learned Abilities"}></TextareaPage>])
                }
                else {
                    arr.push(<SkillsComp level={level} attributes={attrInfo} skills={skillInfo} key={key} charId={charId} value={value} name={key} />);
                }

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
                        <h1 className={"text-center body_"+userTheme}>
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
                <Row>
                    <Col>
                    {learnedAbilties}
                    </Col>
                </Row>
            </Container>

        </div>
    );
};

export default SkillsPage;