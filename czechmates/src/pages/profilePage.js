import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import { useState } from "react";
import TypeAhead from "../components/TypeAhead";
import Social from '../components/Social';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";

/**
 * Purpose: the page that shows the user's information
 * Params/Dependencies:
 * userId: string, the id of the current user
 * userThemeL string, either dark or light depending on the set theme
 */
const ProfilePage = ({ userId, userTheme }) => {

    // variable to track the user's id
    const [userInfo, setUserInfo] = useState();

    // checks the loading state of the page
    const [loading, setLoading] = useState(true);

    //the friends of the given user
    const [friends, setFriends] = useState();

    //the followers of the given user
    const [followers, setFollowers] = useState();

    //the people that the current user is following
    const [following, setFollowing] = useState();

    //the list of all users from the database
    const [allUsers, setAllUsers] = useState();

    /**
     * Purpose: gets the user information from the database when the userid changes
     * Params/Dependencies:
     * userId
     */ 
    useEffect(() => {
        const userRef = ref(db, 'Users/' + userId);
        // IMPORTANT: onValue continues to monitor the database and will update the local value automatically if the db changes
        onValue(userRef, (snapshot) => {
            setUserInfo(snapshot.val());
        });
        const users = ref(db, 'Users/');
        // IMPORTANT: onValue continues to monitor the database and will update the local value automatically if the db changes
        onValue(users, (snapshot) => {
            setAllUsers(snapshot.val());
        });
    }, [userId]);

    /**
     * Purpose: when members changes, this is triggered
     * Params/Dependencies:
     * userInfo
     * userTheme
     */
    useEffect(() => {
        // console.log("check world info ", worldInfo);
        // check that members is not undefined otherwise it will throw an error
        if (userInfo !== undefined && userInfo !== null) {
            setLoading(false);
            // loop through the members objects and create components to display them, set the members array at the end
            var friends = [];
            var followers = [];
            var following = [];
            if (userInfo.Friends != null && userInfo.Friends !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Friends)) {
                    // pass in the key, the character name, and the id of who created the character
                    friends.push(<Social userTheme={userTheme} userName={userInfo.Name} userId={userId} socialId={key} type={"Friend"} key={value} content={value}> </Social>);
                }
                setFriends(friends);
            }
            else {
                setFriends(<h3>You have no friends yet</h3>)
            }

            if (userInfo.Following != null && userInfo.Following !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Following)) {
                    // pass in the key, the character name, and the id of who created the character
                    following.push(<Social userTheme={userTheme} userId={userId} socialId={key} type={"Following"} key={value} content={value}> </Social>);
                }
                setFollowing(following);
            }
            else {
                setFollowing(<h3>You are not following anyone yet</h3>)
            }

            if (userInfo.Followers != null && userInfo.Followers !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Followers)) {
                    // pass in the key, the character name, and the id of who created the character
                    followers.push(<Social userTheme={userTheme} userId={userId} socialId={key} type={"Follower"} key={value} content={value}> </Social>);
                }
                setFollowers(followers);
            }
            else {
                setFollowers(<h3>You have no followers yet</h3>)
            }
        }
    }, [userInfo, userTheme]);

    /**
     * Purpose: sets the loading state to false when the user info loads
     * Params/Dependencies:
     * userInfo
     * loading
     */
    useEffect(() => {
        if (userInfo !== undefined && userInfo !== null) {
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
            <Container fluid="md" className="col-xs-10 col-sm-10 col-md-10 col-lg-10 fullWindow">
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 className={"mb-4 header_" + userTheme}>
                            Account information
                        </h1>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* https://daveceddia.com/react-before-render/ */}
                    {/* these lines produce the control error, we can fix it by moving it out into useeffects */}
                    <User userTheme={userTheme} userInfo={userInfo} invalidNames={allUsers} type={"Name"} label={"Username"} content={userInfo?.Name} userId={userId} />
                </Row>
                <Row>
                    <User type={"Email"} label={"Email"} content={userInfo?.Email} userId={userId} />

                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <h1 className={"mb-4 mt-5 header_" + userTheme}>
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
                        <TypeAhead optionInfo={allUsers} userName={userInfo.Name} userId={userId} action={"follow"}></TypeAhead>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* tabs for each of the users lists, calling add for each */}
                    <ControlledTabs userTheme={userTheme} text={["Friends", "Following", "Followers"]}
                        content={[[
                            <div key={"Friends"} >
                                {/* {addF(userInfo.Friends)} */}
                                {friends}
                            </div>
                        ], [
                            <div key={"Following"} >
                                {/* {addF(userInfo.Following)} */}
                                {following}
                            </div>
                        ], [
                            <div key={"Followers"}>
                                {/* {addF(userInfo.Followers)} */}
                                {followers}
                            </div>
                        ]]} />
                </Row>
            </Container>

        </div>
    );
};

export default ProfilePage;