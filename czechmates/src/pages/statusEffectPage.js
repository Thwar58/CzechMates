
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import StatusEffect from "../components/StatusEffectComp";
import { useEffect } from "react";
import { useState } from "react";

/**
 * Purpose: renders the statusEffects page within the subcharacterPage
 * Params/Dependencies: 
 * statusInfo: object {string:boolean}, the list of all status effects and whether of not the character has them
 * charId: string, the id of the character being viewed
 * userTheme: string, either light or dark based off the users preference
 */
const StatusEffectPage = ({ statusInfo, charId, userTheme }) => {

    //the four different columns of status effects 
    var [statusEffectsOne, setStatusEffectsOne] = useState([]);
    var [statusEffectsTwo, setStatusEffectsTwo] = useState([]);
    var [statusEffectsThree, setStatusEffectsThree] = useState([]);
    var [statusEffectsFour, setStatusEffectsFour] = useState([]);

    /**
     * Purpose: before rending, grab the statuses of the status effects and put them in their own components in the 4 arrays
     * Params/Dependencies: 
     * statusInfo
     */
    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (statusInfo !== undefined) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(statusInfo)) {
                arr.push(<StatusEffect disabled={false} key={key} checked={value} charId={charId} statusName={key} />);
            }
            //divide up the big array of all components into 4 equalt slices
            var one = arr.slice(0, 9);
            var two = arr.slice(9, 18);
            var three = arr.slice(18, 27);
            var four = arr.slice(27, 36);
            //assign the smaller arrays into the variables that get displayed in the building of the page
            setStatusEffectsOne(one);
            setStatusEffectsTwo(two);
            setStatusEffectsThree(three);
            setStatusEffectsFour(four);
        }
    }, [statusInfo]);


    /**
    * Purpose: rendering the status effect page withing the subCharacterPage
    * Params/Dependencies: 
    * statusEffectsOne
    * statusEffectsTwo
    * statusEffectsThree
    * statusEffectsFour
    * userTheme
    */
    return (
        <div>
            <Container fluid="md" className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* title */}
                <h1 className={"text-center body_"+userTheme}>
                    Status Effects
                </h1>
                <div>
                    {/* each of the status effect sections */}
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