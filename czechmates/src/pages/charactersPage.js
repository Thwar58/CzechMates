
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
import DBFunctions from "../utils/firebaseQueries";


const charTemplate = require('./../utils/characterTemplate.json');


// a component for the main character page
//input: the user Id
const CharactersPage = ({ userId, userTheme}) => {

    // 7used in page navigation
    const navigate = useNavigate();

    // variables to track the characters
    var [charInfo, setCharInfo] = useState("");
    var [chars, setChars] = useState([]);
    // a usestate for the loading conditional rendering
    const [loading, setLoading] = useState(true);

    // a function that adds a character to the database
    function addChara() {
        // console.log("char info ", charInfo);
        // console.log("chars ", chars);
        if (charInfo !== undefined) {
            var newId = DBFunctions.newCreateNewCharacter(charTemplate, userId, "");
        }
        // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
        // when you add a character, it sends you to tehe general page for this character so you can edit them
        navigate('/subCharacterPages', { state: { charId: newId } });
    }


    // gets the character information for this user from the database
    useEffect(() => {
        if (userId !== undefined) {
            const charRef = ref(db, 'CharacterUserRel/' + userId);
            onValue(charRef, (snapshot) => {
                // console.log("repeated? ", snapshot.val());
                setCharInfo(snapshot.val());
            });
        }
    }, [userId]);

    // when character info changes, this gets triggered
    useEffect(() => {
        // loop through the characters information and make components for them
        var arr = [];
        if (charInfo !== null) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            for (const [key, value] of Object.entries(charInfo)) {
                console.log(value.Last_Used);
                arr.push(<Character userTheme={userTheme} lastUsed={value.Last_Used} lvl={value.Level} userId={userId} key={key} charId={key} charName={value.Name} />);
            }
           
            setChars(arr);
        }
        else{
            setChars(<h1>You have no characters yet</h1>)
        }

    }, [charInfo, userTheme]);

    // sets the loading screen to false once the data loads
    useEffect(() => {
        if (charInfo !== "") {
            setLoading(false);
        }
    }, [charInfo]);


    // renders the blank loading screen if loading is true
    if (loading) {
        return (
            <div></div>
        )
    }

    return (
        <div  className={"fullWindow body_"+userTheme}>
            <Container fluid="md" className={"col-xs-10 col-sm-10 col-md-10 col-lg-10 body_"+userTheme}>
                <Row>
                    <Col>
                    </Col>
                    <Col className={"text-center col-xs-10 col-sm-10 col-md-10 col-lg-10"}>
                        <h1>
                            Character List
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                
                <Row  className="mb-3">
                    {/* the dropdown for sorting selection */}
                    <DropDownShowsValue chars={chars} setChars={setChars} type={"character"} text="Order by..." actions={["level", "recently used", "alphabetically"]} />
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
                        <button onClick={addChara} className={"btn_"+userTheme}>Plus sign icon</button>
                    </div>
                </Row>
            </Container>

        </div>
    );
};

export default CharactersPage;