
import React from "react";
import InputWithLabel from "../components/InputWithLabel";
import Form from 'react-bootstrap/Form';
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TextareaPage from "../components/TextArea";
import EquipmentDropdown from "../components/EquipmentDropdowns";
import StatusEffect from "../components/StatusEffectComp";
import { useEffect } from "react";
import { useState } from "react";


// this component houses the content for the character equipment
// input: the equipment information for a character
const StatusEffectPage = ({ statusInfo, charId }) => {
    console.log(statusInfo);
    var [statusEffectsOne, setStatusEffectsOne] = useState([]);
    var [statusEffectsTwo, setStatusEffectsTwo] = useState([]);
    var [statusEffectsThree, setStatusEffectsThree] = useState([]);
    var [statusEffectsFour, setStatusEffectsFour] = useState([]);

    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (statusInfo !== undefined) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(statusInfo)) {
                console.log(key, value);
                arr.push(<StatusEffect disabled={false} key={key} checked={value} charId={charId} statusName={key} />);
            }
            console.log(arr);
            var one = arr.slice(0, 9);
            var two = arr.slice(9, 18);
            var three = arr.slice(18, 27);
            var four = arr.slice(27, 36);

            setStatusEffectsOne(one);
            setStatusEffectsTwo(two);
            setStatusEffectsThree(three);
            setStatusEffectsFour(four);

        }

    }, [statusInfo]);



    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                {/* title */}
                <h1 style={{ color: "green", textAlign: "center" }}>
                    Status Effects
                </h1>
                <div>
                    <Row>
                        <Col>
                            {
                                statusEffectsOne
                            }
                        </Col>
                        <Col>
                            {
                                statusEffectsTwo
                            }
                        </Col>
                        <Col>
                            {
                                statusEffectsThree
                            }
                        </Col>
                        <Col>
                            {
                                statusEffectsFour
                            }
                        </Col>

                    </Row>

                </div>

            </Container>
        </div>
    );
};

export default StatusEffectPage;