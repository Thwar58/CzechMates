import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

// a component used in the user portion of the profile page
// future: subject to revamp with reusable components
const User = ({ label, content, path }) => {
    const charRef = ref(db);
    // the value in the form
    var [formValue, setFormValue] = useState(content);

    // for typing
    // when the db gets new information, it triggers this 
    useEffect(() => {
        // console.log("compare", content, formValue);
        // if the form does not match the new input, then the form gets set to this new content
        if (content != formValue) {
            // console.log("different");
            setFormValue(content);
        }
        else {
            // console.log("same");
        }
    }, [content]);



    // if you want it to trigger on click, comment this in and comment out the code above, and add the onclick below
    //https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
    // for button click
    function click() {
        const updates = {};
        updates['Users/User1/Name'] = formValue;
        update(charRef, updates);
        console.log(updates);
    }

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
                    value={formValue}
                    disabled={false}
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
                {/* */}
                <Button onClick={click} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>
            </InputGroup>
        </div>
    );
};

export default User;