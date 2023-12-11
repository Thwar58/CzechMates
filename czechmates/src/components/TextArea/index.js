// https://mdbootstrap.com/docs/b4/react/forms/textarea/

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

/**
 * Purpose: a component that creates text areas
 * Params: 
 * title: string, the name for the text area (inventory or learned skills)
 * content: string, the information to populate the text area
 * charId: string, the character id
 * disabled: boolean, whether the text area is disabled or not
 */
const TextareaPage = ({ title, content, charId, disabled }) => {
    // the reference in the database used for the character
    const charRef = ref(db);
    // a useState for the contents of the text area
    var [formValue, setFormValue] = useState(content);

    /**
     * Purpose: checks that the current value in the textarea doesn't match the value in the database
     * this prevents infinite update loops
     * Params/Dependencies: 
     * content
     */
    useEffect(() => {
        if (content != formValue) {
            setFormValue(content);
        }

    }, [content]);

    /**
     * Purpose: updates the database with the new information when the user types in the field
     * Params/Dependencies: 
     * charId
     * title
     * formValue
     */
    useEffect(() => {
        if (charId !== undefined) {
            // take the label value and replace any spaces with underscores to match the db naming system
            var underScoreAdded = title.replace(/ /g, "_");
            const updates = {};
            // update the database in the appropriate place
            if (title == "Inventory") {
                updates[`Characters/${charId}/Equipment/${underScoreAdded}`] = formValue;
            }
            else if (title == "Learned Abilities") {
                updates[`Characters/${charId}/Skills/${underScoreAdded}`] = formValue;
            }
            update(charRef, updates);
        }

    }, [formValue]);

    /**
     * Purpose: renders the text area component
     * Params/Dependencies: 
     * title
     * disabled
     * formValue
     */
    return (
        <div className="form-group">
            {/* the title of the text area */}
            <label htmlFor="exampleFormControlTextarea1">{title}</label>
            {/* the text area and its content, whether is is enabled or disabled */}
            <textarea
                value={formValue}
                // add the onchange method so that when the form value changes, the formvalue usestate variable
                // gets updated with the value from the form
                // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                onChange={e => setFormValue(e.target.value)}
                disabled={disabled}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
            />
        </div>
    );
};

export default TextareaPage;