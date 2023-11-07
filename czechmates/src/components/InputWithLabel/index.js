
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

// components that have a label and a placeholder and can be enabled or disabled
const InputWithLabel = ({ label, content, disabled, category, userId, charId }) => {

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

    // for typing
    // when the form value changes, this is triggers
    useEffect(() => {
        if (disabled === false) {
            // console.log("update");
            // it writes the new form information to the database
            var underScoreAdded = label.replace(/ /g, "_");
            if (!underScoreAdded.includes("Slot")){
                const updates = {};
                updates[`Characters/${userId}/${charId}/${category}/${underScoreAdded}`] = formValue;
                // console.log(updates);
                // updates[`Users/${path}`] = formValue;
                update(charRef, updates);
                // console.log(updates);
            }
          
        }


    }, [formValue]);
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
                    disabled={disabled}
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
            </InputGroup>
        </div>
    );
};

export default InputWithLabel;