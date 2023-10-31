import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// a component used in the user portion of the profile page
// future: subject to revamp with reusable components
const User = ({ label, content }) => {
    return (
        <div>
                {/* input group to surround the elements */}
                <InputGroup className="mb-3">
                    {/* mane the text the label */}
                    <InputGroup.Text id="basic-addon3">
                        {label}
                    </InputGroup.Text>
                    {/* add the placeholder and set whether it is enabled or disabled */}
                    <Form.Control
                        value={content}
                        disabled={true}
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>
                </InputGroup>
        </div>
    );
};

export default User;