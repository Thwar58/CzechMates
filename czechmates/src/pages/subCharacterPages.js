
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
import StatusEffectPage from "./statusEffectPage";

/**
 * Purpose: the sub characters page is where a character can be edited
 * Params/Dependencies: 
 * userId: string, the id of the user logged in 
 * userTheme: string, the theme, eitehr light or dark, of the current user
 */
const SubCharacterPages = ({ userId, userTheme }) => {

    // handles page changes
    const navigate = useNavigate();

    //navigates to the characters page when the done button is hit
    const navigateToCharPage = () => {
        navigate('/charactersPage');
    }

    //the current page is the tab the user is viewing starts at 0 meaning general page
    const [currPage, setCurrPage] = useState(0)

    // variables to track the character information and the loading state
    var [charInfo, setCharInfo] = useState("");

    //used to allow the change of userTheme while on this page
    var [charId] = useState(sessionStorage.getItem("charId"));

    //decides whether there is the proper data to render otherwise its loading
    const [loading, setLoading] = useState(true);

    /**
     * Purpose: when the userid or the character id change, this is triggered and queries the database
     * Params/Dependencies: 
     * userId
     * charId
     */
    useEffect(() => {
        if (charId !== undefined) {
            // use this path and onValue monitors for changes
            const charRef = ref(db, 'Characters/' + charId);
            onValue(charRef, (snapshot) => {
                setCharInfo(snapshot.val());
            });
        }
    }, [userId, charId]);

    /**
     * Purpose: when the charInfo isnt empty then we render, otheriwise we are loading
     * Params/Dependencies: 
     * charInfo
     */
    useEffect(() => {
        if (charInfo !== "") {
            setLoading(false);
        }
    }, [charInfo]);

    /**
     * Purpose: sets to render nothing if the variable is set only when there is no worldsinfo data
     * Params/Dependencies: 
     * loading
     */
    if (loading) {
        return (
            <div></div>
        )
    }

    /**
     * Purpose: sets the currently viewed tab to the next one and if its on the last one then loop to 0 again
     * Params/Dependencies: 
     */
    function goNext() {
        if (currPage + 1 == 6) {
            setCurrPage(0);
        } else {
            setCurrPage(currPage + 1);
        }
    }

    /**
     * Purpose: sets the currently viewed tab to the previous one and if its on the first one then loop to the end
     * Params/Dependencies: 
     */
    function goBack() {
        if (currPage - 1 == -1) {
            setCurrPage(5);
        } else {
            setCurrPage(currPage - 1);
        }
    }

    /**
     * Purpose: renders the cub characters page
     * Params/Dependencies: 
     * userTheme
     * currPage
     * charInfo
     * charId
     * userId
     */
    return (
        <div>
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10 fullWindow">
                <Row>
                    <Col>
                    </Col>
                    <Col className="col-xs-10 col-sm-10 col-md-10 col-lg-10 ">
                        {/* title */}
                        <h1 style={{padding: "10px"}} className={"text-center label_" + userTheme}>
                        {charInfo.General.Name}
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row className="">
                    {/* tabs for each page, passing in the relevant character information */}
                    <ControlledTabs currPage={currPage} setCurrPage={setCurrPage} userTheme={userTheme} text={["General", "Status Effects", "Equipment", "Skills", "Attributes", "Sheet"]}
                        content={[
                            <GeneralPage userTheme={userTheme} participation={charInfo.Participation} generalInfo={charInfo.General} charId={charId} userId={userId} />,
                            <StatusEffectPage userTheme={userTheme} statusInfo={charInfo.Status_Effects} charId={charId} userId={userId} />,
                            <EquipmentPage userTheme={userTheme} equipInfo={charInfo.Equipment} charId={charId} userId={userId} />,
                            <SkillsPage userTheme={userTheme} level={charInfo.General.Level} skillInfo={charInfo.Skills} attrInfo={charInfo.Attributes} charId={charId} userId={userId} />,
                            <AttributesPage userTheme={userTheme} attrInfo={charInfo.Attributes} charId={charId} userId={userId} />,
                            <SheetPage userTheme={userTheme} sheetInfo={charInfo} charId={charId} userId={userId} />
                        ]} />
                </Row>
                <Row>
                    <Col className="text-end">
                        {/* buttons to go to the previous page, the next pace, and back to the character page */}
                        <Button className={"btn_" + userTheme} onClick={goBack}>Previous</Button>
                        <Button className={"btn_" + userTheme} onClick={navigateToCharPage}>Done</Button>
                        <Button className={"btn_" + userTheme} onClick={goNext}>Next</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SubCharacterPages;