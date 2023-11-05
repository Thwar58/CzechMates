
import React from "react";
import AttributesComp from "../components/AttributesComp";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { useEffect } from "react";

// this component houses the content for the character attributes
const AttributesPage = ({ attrInfo }) => {

    var [left, setLeft] = useState([]);
    var [right, setRight] = useState([]);
    var [bottom, setBottom] = useState([]);


    useEffect(() => {
        if (attrInfo !== undefined) {
            // console.log(attrInfo);
            var arr = [];
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(attrInfo)) {
                // console.log(`${key}: `, value);
                var underScoreRemoved=key.replace(/_/g," ");
                arr.push(<AttributesComp key={key} value={value ?? "Loading..."} name={underScoreRemoved} />);
            }

            var left = arr.slice(0, 8);
            var right = arr.slice(8, 16);
            var bottom = arr.slice(16);
            setLeft(left);
            setRight(right);
            setBottom(bottom);
        }

    }, [attrInfo]);

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