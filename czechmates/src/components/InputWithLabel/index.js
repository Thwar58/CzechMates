
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const InputWithLabel = ({label, placeholder, disabled}) => {
    return (
        <div>
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon3">
                    {label}
                </InputGroup.Text>
                <Form.Control
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </InputGroup>


        </div>
    );
};

export default InputWithLabel;