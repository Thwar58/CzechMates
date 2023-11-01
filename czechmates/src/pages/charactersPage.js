
import React from "react";
import Character from "../components/Character";
import { useNavigate } from 'react-router-dom';
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// a component for the main character page
const CharactersPage = () => {

    // handles page navigation
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPage
        navigate('/subCharacterPages');
    }

    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Character List
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* the dropdown for sorting selection */}
                    <DropDownShowsValue text="Order by..." actions={["level", "recently used", "alphabetically"]} />
                </Row>
                <Row>
                    {/* future: pass information in */}
                    {/* future: generate dynamically instead of hardcoding */}
                    <div id="characters">
                        <Character charName={"filler name"} />
                    </div>
                </Row>
                <Row>
                    {/* button that redirects to the subchar pages */}
                    <div>
                        <button onClick={navigateToGeneral} type="button" className="btn btn-primary">Plus sign icon</button>
                    </div>

                </Row>
            </Container>

        </div>
    );
};

export default CharactersPage;