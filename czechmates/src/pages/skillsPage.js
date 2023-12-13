
import React, { useEffect } from "react";
import SkillsComp from "../components/SkillsComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import TextareaPage from "../components/TextArea";

/**
 * Purpose: renders the skills page within the subChara page
 * Params/Dependencies: 
 * skillInfo: object {string:int}, the list of all skills and their values
 * charId: string, the id of the character being viewed
 * attrInfo: object {string:int}, the list of all attributes with their values
 * userId: string, the id of the current user
 * level: int, the level of the character stored in the characterUserRel in the database
 * userTheme: string, either light or dark based off the users preference
 */
const SkillsPage = ({ skillInfo, charId, attrInfo, userId, level, userTheme }) => {

    // variables to track the skills and position them
    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);

    //the learned abilities is a component that is just a large text box
    var [learnedAbilties, setLearnedAbilities] = useState([]);

    /**
     * Purpose: renders the skills and their values when the page renders and maps each skill to its own skillComp component
     * Params/Dependencies:
     * skillInfo
     * userTheme
     */
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
                    arr.push(<SkillsComp userId={userId} userTheme={userTheme} level={level} attributes={attrInfo} skills={skillInfo} key={key} charId={charId} value={value} name={key} />);
                }

            }
            // splice the array for positioning
            var left = arr.slice(0, 8);
            var right = arr.slice(8);
            // assign the positioning variable
            setLeft(left);
            setRight(right);
        }

    }, [skillInfo, userTheme]);

    /**
     * Purpose: renders the skills page
     * Params/Dependencies:
     * left
     * right
     * learnedAbilities
     * userTheme
     */
    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 className={"text-center body_" + userTheme}>
                            Skills
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* the actual positioning of the skill components */}
                    <Col>
                        {left}
                    </Col>
                    <Col>
                        {right}
                    </Col>
                </Row>
                {/* the learned abilities */}
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