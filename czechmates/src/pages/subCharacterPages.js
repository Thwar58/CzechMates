
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
import { useLocation } from 'react-router-dom';
import StatusEffectPage from "./statusEffectPage";


// a page that contains all of the sub character pages as tabs (i.e. equipment, general)
// input: the user id AND location stores the character id
const SubCharacterPages = ({ userId }) => {
    // handles page changes
    const navigate = useNavigate();
    const navigateToCharPage = () => {
        navigate('/charactersPage');
    }
    // location is used to pass information from the character page to the sub page
    // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
    const location = useLocation();
    // variables to track the character information and the loading state
    var [charInfo, setCharInfo] = useState("");
    var [charId] = useState(location.state.charId);
    const [loading, setLoading] = useState(true);


    // when the userid or the character id change, this is triggered and queries the database
    useEffect(() => {
        if (charId !== undefined){
            // console.log("check char id in sub", charId);
             // use this path and onValue monitors for changes
        const charRef = ref(db, 'Characters/' + charId);
        onValue(charRef, (snapshot) => {
            setCharInfo(snapshot.val());
        });

        }
       

    }, [userId, charId]);

    // set the loading state to false when the information loads
    useEffect(() => {
        if (charInfo !== "") {
            setLoading(false);
        }
        // console.log(charInfo);
    }, [charInfo]);

    // render the blank loading screen if the data hasn't loaded yet
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
                    {/* tabs for each page, passing in the relevant character information */}
                    <ControlledTabs text={["General", "Status Effects", "Equipment", "Skills", "Attributes", "Sheet"]}
                        content={[
                        <GeneralPage participation={charInfo.Participation} generalInfo={charInfo.General} charId={charId} userId={userId} />,
                        <StatusEffectPage statusInfo={charInfo.Status_Effects} charId={charId} userId={userId} />,
                        <EquipmentPage equipInfo={charInfo.Equipment} charId={charId} userId={userId} />,
                        <SkillsPage level={charInfo.General.Level} skillInfo={charInfo.Skills} attrInfo={charInfo.Attributes} charId={charId} userId={userId} />,
                        <AttributesPage attrInfo={charInfo.Attributes} charId={charId} userId={userId} />,
                        <SheetPage sheetInfo={charInfo} charId={charId} userId={userId} />
                        ]} />
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