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

const ProfilePage = () => {

    // pretend we know this is user 1 because they logged in already

    var [userInfo, setUserInfo] = useState("");
    var [userId] = useState("User1");

    function addF(type) {
        if (type !== undefined) {
            var arr = [];
            // https://flexiple.com/javascript/loop-through-object-javascript
            Object.values(type).forEach(val => 
                arr.push(<Social key={val} content={val}> </Social>));
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
            // for (const [value] of Object.entries(worldInfo)) {
            //     // console.log(`${key}: `, value);
            //     arr.push(<World key={value.Name} worldName={value.Name}> </World>);
            //   }
            // console.log("test");
            return arr;
        }

    }

    useEffect(() => {

        const userRef = ref(db, 'Users/' + userId);
        onValue(userRef, (snapshot) => {
            setUserInfo(snapshot.val());
        });

        // const dbRef = ref(db);
        // get(child(dbRef, `Users/` + userId)).then((snapshot) => {
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
        // console.log(userInfo);
    }, [userInfo]);


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
                    <User label={"Username"} content={userInfo?.Name ?? "Loading..."} />
                </Row>
                <Row>
                    <User label={"Email"} content={userInfo?.Email ?? "Loading..."} />
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
                                {/* {userInfo?.Friends?.map((name) => (
                                    <Social key={name} content={name} />
                                ))} */}
                                {addF(userInfo.Friends)}
                            </div>
                        ], [
                            <div key={"Following"} >
                                {/* {userInfo?.Following?.map((name) => (
                                    <Social key={name} content={name} />
                                ))} */}
                                {addF(userInfo.Following)}
                            </div>
                        ], [
                            <div key={"Followers"}>
                                {/* {userInfo?.Followers?.map((name) => (
                                    <Social key={name} content={name} />
                                ))} */}
                                {addF(userInfo.Followers)}
                            </div>
                        ]]} />


                </Row>

                {/* future: generate dynamically instead of hardcoding */}
                {/* future: pass information in */}



                {/* future: choose one search bar and remove the rest */}
                {/* search bar options start here */}
                {/* <Searchbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <ul>
                {filteredPosts.map(post => (
                    <li key={post.id}>{post.name}
                        <button type="button" className="btn btn-primary">Follow</button>
                    </li>
                ))}
            </ul>
            <Spacer /> */}
                {/* <TypeAhead />
            <Spacer /> */}

                {/* end search bar options */}

                {/* tabs for the friends, following, and followers */}
                {/* hardcoded social components for now */}
            </Container>

        </div>
    );
};

export default ProfilePage;