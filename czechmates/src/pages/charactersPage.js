
import React from "react";
import Character from "../components/Character";
import { useNavigate } from 'react-router-dom';
import DropDownShowsValue from "../components/DropDownShowsValue";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import DBFunctions from "../utils/firebaseQueries";
// the blank template used for making a new character
const charTemplate = require('./../utils/characterTemplate.json');


/**
 * Purpose: the component for the character page
 * Params: 
 * userId: string, the user's id
 * userTheme: string, the user's color theme
 */
const CharactersPage = ({ userId, userTheme }) => {
    // useState used in page navigation
    const navigate = useNavigate();
    // useState to store the character information
    var [charInfo, setCharInfo] = useState("");
    var [chars, setChars] = useState([]);
    // a usestate for the loading conditional rendering
    const [loading, setLoading] = useState(true);
    // decides wheter the dropdown for sorting is diabled or not
    const [hasChars, setHasChars] = useState(false);

    /**
     * Purpose: adds a character to the database in association with the user and brings you to
     * the edit page for this character
     * Params/Dependencies: 
     * userId
     * charInfo
     * charTemplate
     */
    function addChara() {
        if (charInfo !== undefined) {
            var newId = DBFunctions.newCreateNewCharacter(charTemplate, userId, "");
        }
        // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
        // when you add a character, it sends you to the general page for this character so you can edit them
        navigate('/subCharacterPages', { state: { charId: newId } });
        sessionStorage.setItem("charId", newId);
    }

    /**
     * Purpose: gets the character information for this user
     * Params/Dependencies: 
     * userId
     */
    useEffect(() => {
        if (userId !== undefined) {
            const charRef = ref(db, 'CharacterUserRel/' + userId);
            onValue(charRef, (snapshot) => {
                setCharInfo(snapshot.val());
            });
        }
    }, [userId]);



    /**
     * Purpose: makes components for each of the characters
     * Params/Dependencies: 
     * userTheme
     */
    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (charInfo !== null) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(charInfo)) {
                arr.push(<Character userTheme={userTheme} lastUsed={value.Last_Used} lvl={value.Level} userId={userId} key={key} charId={key} charName={value.Name} />);
            }
            setChars(arr);
            setHasChars(true);
        }
        // inform the user that they don't have any characters
        else {
            setChars(<h3>You have no characters yet</h3>)
            setHasChars(false);
        }
    }, [charInfo, userTheme]);

    /**
     * Purpose: sets the loading state when the information loads
     * Params/Dependencies: 
     * charInfo
     */
    useEffect(() => {
        if (charInfo !== "") {
            setLoading(false);
        }
    }, [charInfo]);


    /**
     * Purpose: renders the blank screen if the information isn't loaded
     * Params/Dependencies: 
     */
    if (loading) {
        return (
            <div></div>
        )
    }

    /**
     * Purpose: renders the page contents when the information is loaded
     * Params/Dependencies: 
     * userTheme
     * chars
     */
    return (
        <div className={"fullWindow body_" + userTheme}>
            <Container fluid="md" className={"col-xs-10 col-sm-10 col-md-10 col-lg-10 body_" + userTheme}>
                <Row>
                    <Col>
                    </Col>
                    <Col className={"text-center mb-4 col-xs-10 col-sm-10 col-md-10 col-lg-10"}>
                        <h1>
                            Character List
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>

                <Row className="mb-3">
                    {/* the dropdown for sorting selection */}
                    <DropDownShowsValue hasItems={hasChars} userTheme={userTheme} chars={chars} setChars={setChars} type={"character"} text="Order by..." actions={["level", "recently used", "alphabetically"]} />
                </Row>
                {/* loading in the character components */}
                <Row>
                    <div>
                        {
                            chars
                        }
                    </div>
                </Row>
                <Row>
                    {/* button that adds a character and redirects to the subchar pages */}
                    <div>
                        <Button onClick={addChara} className={"btn_" + userTheme}>Add Character</Button>
                    </div>
                </Row>
            </Container>

        </div>
    );
};

export default CharactersPage;