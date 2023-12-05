import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { useInRouterContext } from "react-router-dom";

// a component used for the social portion of the profile page
// input: the name of the (friend/follower/following) user
const Social = ({ content, type, userId, socialId, userName, userTheme }) => {
    var [removal, setRemoval] = useState();

    useEffect(() => {
        if (type === "Friend") {
            // content={`Are you sure you want to remove ${charName}? Removing this character will also remove you from the worlds they are in.`} title={`Removing a character...`} id="removeButton" action={{ userId, charId }} name="Remove" type={'removeChara'} 
            setRemoval(<ConfirmationPopup content={"Are you sure you want to remove this friend? You will be removed from each other's worlds."} action={{ userId, socialId, userName, content }} title={"Removing a Friend..."} type={type} name={"Remove"} />);
        }
        else if (type === "Following") {
            // content={`Are you sure you want to remove ${charName}? Removing this character will also remove you from the worlds they are in.`} title={`Removing a character...`} id="removeButton" action={{ userId, charId }} name="Remove" type={'removeChara'} 
            setRemoval(<ConfirmationPopup userTheme={userTheme} content={"Are you sure you want to unfollow this user?"} action={{ userId, socialId, userName, content }} title={"Unfollowing someone..."} type={type} name={"Remove"} />);
        }

    }, [type]);

    // if (type !=="Follower"){
    //     setRemoval(<ConfirmationPopup name={"Remove"} />);
    // }

    return (
        <div>
            <InputGroup className="mb-3">
                {/* add the placeholder and set whether it is enabled or disabled */}
                <Form.Control
                    value={content}
                    disabled={true}
                />
                {removal}
            </InputGroup>
        </div>

    );
};

export default Social;