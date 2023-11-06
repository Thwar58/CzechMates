
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
import { useEffect } from "react";
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import { useState } from "react";

// a page that contains all of the sub character pages as tabs (i.e. equipment, general)
const SubCharacterPages = ({ userId }) => {
    // handles page changes
    const navigate = useNavigate();
    const navigateToCharPage = () => {
        // navigate to /characterPage
        navigate('/charactersPage');
    }

    var [charInfo, setCharInfo] = useState("");
    var [charId] = useState("CharID1");
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const charRef = ref(db, 'Characters/' + userId + '/' + charId);
        onValue(charRef, (snapshot) => {
            setCharInfo(snapshot.val());
        });

    }, [userId, charId]);

    useEffect(() => {
        if (charInfo !== "") {
            // console.log("final check ", userInfo);
            setLoading(false);
        }
        // console.log(charInfo);
    }, [charInfo]);

    // https://www.reddit.com/r/reactjs/comments/z3ue4o/useeffect_and_map_function_not_working_well/
    if (loading) {
        return (
            <div></div>
        )
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
                        content={[<GeneralPage generalInfo={charInfo.General} charId={charId} userId={userId} />,
                        <EquipmentPage equipInfo={charInfo.Equipment} charId={charId} userId={userId} />,
                        <SkillsPage skillInfo={charInfo.Skills} charId={charId} userId={userId} />,
                        <AttributesPage attrInfo={charInfo.Attributes} charId={charId} userId={userId} />,
                        <SheetPage sheetInfo={charInfo} charId={charId} userId={userId} />]} />
                </Row>
                <Row>
                    <Col>
                        {/* a button that redirects to the character page when clicked */}
                        <Button style={{ float: "right" }} onClick={navigateToCharPage}>Done</Button>
                    </Col>

                </Row>

            </Container>

        </div>
    );
};

export default SubCharacterPages;