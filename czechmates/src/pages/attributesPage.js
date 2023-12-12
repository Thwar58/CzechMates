
import React from "react";
import AttributesComp from "../components/AttributesComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { useEffect } from "react";

/**
 * Purpose: the component for the entire character attribute page
 * Params: 
 * attrInfo: JSON object, all of the attributes and their values for this character
 * userTheme: string, the user's color theme
*/
const AttributesPage = ({ attrInfo, userTheme }) => {
    // useStates to position the attributes
    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);
    var [bottom, setBottom] = useState([]);


   /**
     * Purpose: loads each of the attributes and positions them on the page
     * Params/Dependencies: 
     * attrInfo
    */
    useEffect(() => {
        if (attrInfo !== undefined) {
            // loop through the attributes and make components for each of them
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(attrInfo)) {
                // convert the db name to a human readable name
                var underScoreRemoved = key.replace(/_/g, " ");
                arr.push(<AttributesComp key={key} value={value ?? "Loading..."} name={underScoreRemoved} />);
            }
            // splice the array so that we can assign different portions to different sections of the page
            var left = arr.slice(0, 8);
            var right = arr.slice(8, 16);
            var bottom = arr.slice(16);
            // set all the portions of the page
            setLeft(left);
            setRight(right);
            setBottom(bottom);
        }

    }, [attrInfo]);

    /**
     * Purpose: render the page
     * Params/Dependencies: 
     * userTheme
     * left
     * right
     * bottom
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
                            Attributes
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* the left and right columns of attributes */}
                    <Col>
                        {left}
                    </Col>
                    <Col>
                        {right}
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-12 col-sm-10 col-md-7 col-lg-7">
                        {/* the buttom attribute since there are an odd number */}
                        {bottom}
                    </Col>
                    <Col>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default AttributesPage;