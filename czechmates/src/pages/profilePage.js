import User from "../components/User";
import ControlledTabs from '../components/Tabs';
import { useState } from "react";
import TypeAheadWithButton from "../components/TypeAheadWithButton";
import TypeAhead from "../components/TypeAhead";
import Social from '../components/Social';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from "react";
import { db } from '../firebase';
import { ref, onValue } from "firebase/database";
import InputWithLabel from "../components/InputWithLabel";
import NavWithDD from '../components/NavWithDropdown';
import { useTheme } from "@emotion/react";

// the profile page for the user
// input: the user's id
const ProfilePage = ({ userId, userTheme }) => {
    // variables to track the user id and the loading state
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState();
    const [followers, setFollowers] = useState();
    const [following, setFollowing] = useState();
    const [allUsers, setAllUsers] = useState();




    // this needs a major revamp
    // a function that adds a friend/follower/following to the users lists
    // function addF(type) {
    //     // console.log(type);
    //     if (type !== undefined) {
    //         // loops through the users list and adds social components for each one
    //         var arr = [];
    //         // https://flexiple.com/javascript/loop-through-object-javascript
    //         Object.values(type).forEach(val =>
    //             arr.push(<Social key={val} content={val}> </Social>));
    //         return arr;
    //     }
    // }

    // gets the user information from the database when the userid changes
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

   
    // when members changes, this is triggered
    useEffect(() => {
        // console.log("check world info ", worldInfo);
        // check that members is not undefined otherwise it will throw an error
        if (userInfo !== undefined && userInfo !== null) {
            setLoading(false);
            // console.log(userInfo);
            // console.log("check world info ", worldInfo);
            // loop through the members objects and create components to display them, set the members array at the end
            var friends = [];
            var followers = [];
            var following = [];
            // console.log("check WI for members ", worldInfo);
            if (userInfo.Friends != null && userInfo.Friends !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Friends)) {
                    // console.log("check name ", value);
                    // pass in the key, the character name, and the id of who created the character
                    // arr.push(<UEWithTwoButtons key={key} charId={key} charName={value} />);
                    friends.push(<Social userTheme={userTheme} userName={userInfo.Name} userId={userId} socialId={key} type={"Friend"} key={value} content={value}> </Social>);
                }
                setFriends(friends);
                // setMems(arr);

            }
            else {
                setFriends(<h1>You have no friends yet</h1>)
            }
            
            if (userInfo.Following != null && userInfo.Following  !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Following )) {
                    // console.log("check name ", value);
                    // pass in the key, the character name, and the id of who created the character
                    following.push(<Social userTheme={userTheme} userId={userId} socialId={key} type={"Following"} key={value} content={value}> </Social>);
                }
                setFollowing(following);
                // setMems(arr);

            }
            else {
                setFollowing(<h1>You are not following anyone yet</h1>)
            }
           
            if (userInfo.Followers  != null &&userInfo.Followers !== undefined) {
                // // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
                for (const [key, value] of Object.entries(userInfo.Followers)) {
                    // console.log("check name ", value);
                    // pass in the key, the character name, and the id of who created the character
                    followers.push(<Social userTheme={userTheme} userId={userId} socialId={key} type={"Follower"} key={value} content={value}> </Social>);
                }
                setFollowers(followers);
                // setMems(arr);

            }
            else {
                setFollowers(<h1>You have no followers yet</h1>)
            }
            // console.log("followers done");



        }
    }, [userInfo, userTheme]);

    // sets the loading state to false when the user info loads
    useEffect(() => {
        if (userInfo !== undefined && userInfo !== null) {
            setLoading(false);
            // console.log(userInfo);
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
                        <h1 className={"header_"+userTheme}>
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
                        <h1 className={"header_"+userTheme}>
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
                        {/* <TypeAheadWithButton /> */}
                        <TypeAhead optionInfo={allUsers} userName={userInfo.Name} userId={userId} action={"follow"}></TypeAhead>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    {/* tabs for each of the users lists, calling addF for each */}
                    <ControlledTabs text={["Friends", "Following", "Followers"]}
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