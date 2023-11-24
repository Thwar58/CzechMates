// https://mdbootstrap.com/docs/b4/react/forms/textarea/

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

const TextareaPage = ({ title, content, charId, userId }) => {

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
        // take the label value and replace any spaces with underscores to match the db naming system
        var underScoreAdded = title.replace(/ /g, "_");
        const updates = {};
        if (title == "Inventory"){
            updates[`Characters/${charId}/Equipment/${underScoreAdded}`] = formValue;
        }
        // ignore the modification slots for now (it is broken and needs to be fixed)
        // make an object to store the different paths that need to be updated
        
        // use the path to the specific property that this form field maps to in the database
        // and set it to the value in the form
        // console.log(updates);
        update(charRef, updates);

    }, [formValue]);


    return (
        <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">{title}</label>
            <textarea
                value={formValue}
                // add the onchange method so that when the form value changes, the formvalue usestate variable
                // gets updated with the value from the form
                // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                onChange={e => setFormValue(e.target.value)}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
            />
        </div>
    );
};

export default TextareaPage;