
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
const CharactersPage = ({ userId }) => {

    // handles page navigation
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPage
        navigate('/subCharacterPages');
    }

    var [charInfo, setCharInfo] = useState("");
    var [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);


    function addChara(){
        // console.log(charTemplate);
        var id = DBFunctions.createNewCharacter(userId, charTemplate);
        // https://stackoverflow.com/questions/64566405/react-router-dom-v6-usenavigate-passing-value-to-another-component
        navigate('/subCharacterPages',{state:{charId:id}});
        // navigateToGeneral();
    }

    



    useEffect(() => {
        const charRef = ref(db, 'Characters/' + userId);
        onValue(charRef, (snapshot) => {
            // console.log(snapshot.val());
            // var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            //    Object.values(snapshot.val()).forEach(val =>arr.push(val));
            // setCharInfo(arr);
            setCharInfo(snapshot.val());
        });

    }, [userId]);

    useEffect(() => {
        // console.log(charInfo);
        // var arr = [];
        // https://flexiple.com/javascript/loop-through-object-javascript
        // Object.values(charInfo).forEach(val =>
        //     arr.push(<Character key={val.General.Name} charName={val.General.Name} />));
        // setChars(arr);

        var arr = [];
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
        for (const [key, value] of Object.entries(charInfo)) {
            arr.push(<Character key={key} charInfo={value} userId={userId} charId={key} charName={value.General.Name} />);
        }
        setChars(arr);
    }, [charInfo]);

    useEffect(() => {
        if (charInfo !== "") {
            // console.log("final check ", userInfo);
            setLoading(false);
        }
        // console.log(charInfo);
    }, [charInfo]);


    if (loading) {
        return (
            <div></div>
        )
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
                    <div>
                        {
                            chars
                        }

                    </div>
                </Row>
                <Row>
                    {/* button that redirects to the subchar pages */}
                    <div>
                        <button onClick={addChara} type="button" className="btn btn-primary">Plus sign icon</button>
                    </div>

                </Row>
            </Container>

        </div>
    );
};

export default CharactersPage;