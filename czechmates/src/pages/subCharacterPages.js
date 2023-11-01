
import React from "react";
import ControlledTabs from "../components/Tabs";
import GeneralPage from "./generalPage";
import EquipmentPage from "./equipmentPage";
import SkillsPage from "./skillsPage";
import AttributesPage from "./attributesPage";
import SheetPage from "./sheetPage";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// a page that contains all of the sub character pages as tabs (i.e. equipment, general)
const SubCharacterPages = () => {
    // handles page changes
    const navigate = useNavigate();
    const navigateToCharPage = () => {
        // navigate to /characterPage
        navigate('/charactersPage');
    }
    // returns a div with the character name and the tabs for each of the pages
    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        {/* title */}
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Character Name
                        </h1>

                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* tabs for each page, passing in the labels and the page objects */}
                    <ControlledTabs text={["General", "Equipment", "Skills", "Attributes", "Sheet"]}
                        content={[<GeneralPage />, <EquipmentPage />, <SkillsPage />, <AttributesPage />, <SheetPage />]} />
                </Row>
                <Row>
                    <Col>
                     {/* a button that redirects to the character page when clicked */}
                     <Button style={{float: "right"}} onClick={navigateToCharPage}>Done</Button>
                    </Col>
                   
                </Row>

            </Container>

        </div>
    );
};

export default SubCharacterPages;