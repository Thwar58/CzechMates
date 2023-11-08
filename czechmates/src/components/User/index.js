import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

// a component used in the user portion of the profile page
// input: the label, the name or email of the user, the path to be used in the db changes
const User = ({ label, content, path }) => {
    // a reference to the database
    const charRef = ref(db);
    // the value in the form and the function to set it, init to content
    var [formValue, setFormValue] = useState(content);

    // when the db sends new information, this is triggered
    useEffect(() => {
        // if the form does not match the new input, then the form gets set to this new content
        // IMPORTANT: this prevents the loops of death db form update cycle
        if (content != formValue) {
            setFormValue(content);
        }

    }, [content]);

    // a function used to send the form information to the database (used in button click below)
    //https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
    function click() {
        // create the updates object and set it to the form value using the path passed in
        const updates = {};
        updates[`Users/${path}`] = formValue;
        // update the database
        update(charRef, updates);
    }

    return (
        <div>
            {/* input group to surround the elements */}
            <InputGroup className="mb-3">
                {/* set the text label */}
                <InputGroup.Text id="basic-addon3">
                    {label}
                </InputGroup.Text>
                {/* add the placeholder and set whether it is enabled or disabled */}
                <Form.Control
                    // sets the form value 
                    value={formValue}
                    // enables this input 
                    disabled={false}
                    // sets the formvalue variable to the form value when the form value changes
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
                {/* edit button, calls the click function */}
                <Button onClick={click} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>
            </InputGroup>
        </div>
    );
};

export default User;