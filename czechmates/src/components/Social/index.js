import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// a component used for the social portion of the profile page
// future: subject to revamp later to use reuable elements
const Social = ({content}) => {
    return (
        <div>
             <InputGroup className="mb-3">
                    {/* add the placeholder and set whether it is enabled or disabled */}
                    <Form.Control
                        value={content}
                        disabled={true}
                    />
                    <ConfirmationPopup name={"Remove"} />
                </InputGroup>
        </div>
            
    );
};

export default Social;