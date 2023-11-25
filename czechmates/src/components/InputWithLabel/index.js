
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

// components that have a label and a placeholder and can be enabled or disabled
// input: the label, the content of the input, whether it is disabled or not,
// the type of input this is (i.e. Equipment, Skills), the userId, and the characterId
const InputWithLabel = ({ label, content, disabled, category, userId, charId }) => {

    // the reference in the database used for the character
    const charRef = ref(db);
    // the value in the form and the function to set it
    var [formValue, setFormValue] = useState(content);

    // when the db gets new information, this is triggered
    useEffect(() => {
        // if the form does not match the new input, then the form gets set to this new content
        // this is to prevent the database and input from cycling in an infinite update loop
        if (content != formValue) {
            setFormValue(content);
        }
    
    }, [content]);

    // when the form value changes, this is triggered
    useEffect(() => {
        if (disabled === false) {
            // take the label value and replace any spaces with underscores to match the db naming system
            var underScoreAdded = label.replace(/ /g, "_");
            // ignore the modification slots for now (it is broken and needs to be fixed)
            if (!underScoreAdded.includes("Slot")){
                // make an object to store the different paths that need to be updated
                const updates = {};
                // use the path to the specific property that this form field maps to in the database
                // and set it to the value in the form
                updates[`Characters/${charId}/${category}/${underScoreAdded}`] = formValue;
                if (label === "Name"){
                    updates[`CharacterUserRel/${userId}/${charId}/Name`] = formValue;
                    // need to update world member names here?
                }
                // console.log(updates);
                update(charRef, updates);
            } 
            
        }
    }, [formValue]);

    return (
        <div>
            {/* input group to surround the elements */}
            <InputGroup className="mb-3">
                {/* set the label */}
                <InputGroup.Text id="basic-addon3">
                    {label}
                </InputGroup.Text>
                <Form.Control
                // set the value to to formValue useState variable
                    value={formValue}
                    // set the placeholder to be "enter" whatever the label is and either disable or enable the form
                    placeholder={`Enter the ${label}`}
                    disabled={disabled}
                    // add the onchange method so that when the form value changes, the formvalue usestate variable
                    // gets updated with the value from the form
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
            </InputGroup>
        </div>
    );
};

export default InputWithLabel;