import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";

// a component used for the social portion of the profile page
// input: the name of the (friend/follower/following) user
const Social = ({ content, type }) => {
    var [removal, setRemoval] = useState();

    useEffect(() => {
        if (type !== "Follower") {
            setRemoval(<ConfirmationPopup name={"Remove"} />);
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