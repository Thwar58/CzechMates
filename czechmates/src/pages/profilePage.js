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
import { child, get } from "firebase/database";


const ProfilePage = ({ userId }) => {

    const [userInfo, setUserInfo] = useState("");
    const [loading, setLoading] = useState(true);


    function addF(type) {
        // console.log(type);
        if (type !== undefined) {
            var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            Object.values(type).forEach(val =>
                arr.push(<Social key={val} content={val}> </Social>));
            return arr;
        }
    }

    useEffect(() => {
        const userRef = ref(db, 'Users/' + userId);
        onValue(userRef, (snapshot) => {
            setUserInfo(snapshot.val());
        });


        // // https://firebase.google.com/docs/database/web/read-and-write
        // get(child(dbRef, 'Users/' + userId)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         setUserInfo(snapshot.val());
        //     } else {
        //         console.log("No data available");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });

    }, [userId]);

    useEffect(() => {
        if (userInfo !== "") {
            // console.log("final check ", userInfo);
            setLoading(false);
        }

        // console.log("userInfo ", userInfo);
    }, [userInfo]);

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