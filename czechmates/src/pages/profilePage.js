import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import { useState } from "react";
import TypeAheadWithButton from "../components/TypeAheadWithButton";
import Social from '../components/Social';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

// the profile page for the user
// input: the user's id
const ProfilePage = ({ userId }) => {
    // variables to track the user id and the loading state
    const [userInfo, setUserInfo] = useState("");
    const [loading, setLoading] = useState(true);


    // a function that adds a friend/follower/following to the users lists
    function addF(type) {
        // console.log(type);
        if (type !== undefined) {
            // loops through the users list and adds social components for each one
            var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            Object.values(type).forEach(val =>
                arr.push(<Social key={val} content={val}> </Social>));
            return arr;
        }
    }

    // gets the user information from the database when the userid changes
    useEffect(() => {
        const userRef = ref(db, 'Users/' + userId);
        // IMPORTANT: onValue continues to monitor the database and will update the local value automatically if the db changes
        onValue(userRef, (snapshot) => {
            setUserInfo(snapshot.val());
        });

    }, [userId]);

    // sets the loading state to false when the user info loads
    useEffect(() => {
        if (userInfo !== "") {
            setLoading(false);
        }

    }, [userInfo]);

    // returns the blank loading screen if the data is not loaded
    // https://www.reddit.com/r/reactjs/comments/z3ue4o/useeffect_and_map_function_not_working_well/
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
                    <Col>
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Account information
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* https://daveceddia.com/react-before-render/ */}
                    <User label={"Username"} content={userInfo?.Name} path={`${userId}/Name`} />
                </Row>
                <Row>
                    <User label={"Email"} content={userInfo?.Email} path={`${userId}/Email`} />
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 style={{ color: "green", textAlign: "center" }}>
                            Social
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col md={10}>
                        <TypeAheadWithButton />
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* tabs for each of the users lists, calling addF for each */}
                    <ControlledTabs text={["Friends", "Following", "Followers"]}
                        content={[[
                            <div key={"Friends"} >
                                {addF(userInfo.Friends)}
                            </div>
                        ], [
                            <div key={"Following"} >
                                {addF(userInfo.Following)}
                            </div>
                        ], [
                            <div key={"Followers"}>
                                {addF(userInfo.Followers)}
                            </div>
                        ]]} />
                </Row>
            </Container>

        </div>
    );
};

export default ProfilePage;