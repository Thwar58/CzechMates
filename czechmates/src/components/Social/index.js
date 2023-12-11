import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { useEffect } from "react";

/**
 * Purpose: the component used to display friends, following, and followers
 * Params: 
 * content: string, the name of the user
 * type: string, what type of social componen this is (friend, follower, following)
 * userId: string, the user id
 * socialId: string, the id of the user represented by this component
 * userName: string, the name of the user in this component
 * userTheme: the user's color theme
 */
const Social = ({ content, type, userId, socialId, userName, userTheme }) => {
    // a useState for removals of friends and following
    var [removal, setRemoval] = useState();

    /**
     * Purpose: adds a confirmation to the component if the type is friend or following so the user can remove them
     * users cannot remove followers
     * Params/Dependencies: 
     * type
     * userTheme
     * userId
     * socialId
     * userName
     * content
     */
    useEffect(() => {
        if (type === "Friend") {
            setRemoval(<ConfirmationPopup userTheme={userTheme} content={"Are you sure you want to remove this friend? You will be removed from each other's worlds."} action={{ userId, socialId, userName, content }} title={"Removing a Friend..."} type={type} name={"Remove"} />);
        }
        else if (type === "Following") {
            setRemoval(<ConfirmationPopup userTheme={userTheme} content={"Are you sure you want to unfollow this user?"} action={{ userId, socialId, userName, content }} title={"Unfollowing someone..."} type={type} name={"Remove"} />);
        }

    }, [type]);

    /**
     * Purpose: renders the social component
     * Params/Dependencies: 
     * content
     * removal
     */
    return (
        <div>
            <InputGroup className="mb-3">
                {/* the other user's name, disabled*/}
                <Form.Control
                    value={content}
                    disabled={true}
                />
                {/* a removal confirmation popup if available for this type */}
                {removal}
            </InputGroup>
        </div>

    );
};

export default Social;