import React, { cloneElement } from "react";
import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import Searchbar from '../components/Searchbar';
import { useState } from "react";
import TypeAhead from "../components/TypeAhead";
import Spacer from '../components/Spacer';
import TypeAheadWithButton from "../components/TypeAheadWithButton";
import Social from '../components/Social';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DBFunctions from "../utils/firebaseQueries";
import { useEffect } from "react";
import { db } from '../firebase';
import { child, get, ref, onValue } from "firebase/database";

const ProfilePage = () => {

    // pretend we know this is user 1 because they logged in already

    var [userInfo, setUserInfo] = useState("");
    var [userId] = useState("User1");

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

    }, []);

    useEffect(() => {
        // console.log(userInfo);
    }, [userInfo]);




    const posts = [
        { id: '1', name: 'This first post is about React' },
        { id: '2', name: 'This next post is about Preact' },
        { id: '3', name: 'We have yet another React post!' },
        { id: '4', name: 'This is the fourth and final post' },
    ];

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post) => {
            const postName = post.name.toLowerCase();
            return postName.includes(query);
        });
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(posts, searchQuery);
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
                            <div>
                                {/* {userInfo?.Email ?? "Loading..."} */}
                                {userInfo?.Friends?.map((name) => (
                                    <Social content={name} />
                                ))}
                            </div>
                        ], [
                            <div>
                                {/* {userInfo?.Email ?? "Loading..."} */}
                                {userInfo?.Following?.map((name) => (
                                    <Social content={name} />
                                ))}
                            </div>
                        ], [
                            <div>
                                {/* {userInfo?.Email ?? "Loading..."} */}
                                {userInfo?.Followers?.map((name) => (
                                    <Social content={name} />
                                ))}
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