
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// components that have a label and a placeholder and can be enabled or disabled
const InputWithLabel = ({ label, placeholder, disabled }) => {
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
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </InputGroup>
        </div>
    );
};

export default InputWithLabel;