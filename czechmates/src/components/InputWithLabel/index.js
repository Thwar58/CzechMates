
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
// the JSON object with the descriptions for the general page tooltips
const descriptions = require('../../utils/generalTooltips.json');

/**
* Purpose: this component is used to display various different character information
* Params:
* tooltip: boolean, whether or not the inputlabel should display a tooltip when hovered
* participation: string, the world id if a character is participating in one
* type: string, used for the modification slots (weapon, armor, shield)
* label: string, the text for the label of the input field, generall the name of the field
* content: string, the default value of the input field
* disabled: boolean, whether the input field is disabled or not
* category: string, the area of the character that the information falls under (General, Skills, etc.)
* userId: string, the user's id
* charId: string, the character's id
*/
const InputWithLabel = ({ tooltip, participation, type, label, content, disabled, category, userId, charId }) => {

    // if this component requires a tooptip, then find the matching description in the JSON object
    if (tooltip === true) {
        var desc;
        for (let i = 0; i < descriptions.length; i++) {
            if (descriptions[i].Name === label) {
                desc = descriptions[i].Description;
            }
        }
    }

    // the reference in the database used for the character
    const charRef = ref(db);

    // the useState for the text of the text field 
    var [formValue, setFormValue] = useState(content);


    /**
    * Purpose: this checks if the information recieved from the database is the same as the content already in the form
    * this is to prevent a continuous update loop as a result of the onValue and useEffect below repeating
    * Params/Dependencies:
    * content
    */
    useEffect(() => {
        if (content != formValue) {
            setFormValue(content);
        }

    }, [content]);


    /**
    * Purpose: updates the database whenever the user types something in the input field
    * Params/Dependencies:
    * formValue
    */
    useEffect(() => {
        if (disabled === false) {
            // take the label value and replace any spaces with underscores to match the db naming system
            var underScoreAdded = label.replace(/ /g, "_");
            const updates = {};
            // update the database in the place corresponding to this input field
            if (!underScoreAdded.includes("Slot")) {
                updates[`Characters/${charId}/${category}/${underScoreAdded}`] = formValue;
            }
            // address the modification slot updates because they need to specify the type as well
            else if (underScoreAdded.includes("Slot")) {
                updates[`Characters/${charId}/${category}/${type}_Modification_Slots/${underScoreAdded}`] = formValue;
            }
            // if the user is changing the name, then the characters name in the world members list must be updates as well
            if (label === "Name") {
                updates[`CharacterUserRel/${userId}/${charId}/Name`] = formValue;
                if (participation !== undefined) {
                    updates[`Worlds/${participation}/Members/${charId}/Name`] = formValue;
                }

            }

            update(charRef, updates);
        }
    }, [formValue]);

    /**
    * Purpose: the content for the tooltips
    * Params/Dependencies:
    * desc
    * label
    */
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{label}</Popover.Header>
            <Popover.Body>
                {desc}
            </Popover.Body>
        </Popover>
    );

    /**
    * Purpose: if the tooltips are turned on for this component, then this is what renders 
    * Params/Dependencies:
    * tooltip
    * label
    * formValue
    * disabled
    */
    if (tooltip === true) {
        return (
            <div>
                {/* tooltip surrounding the component */}
                <OverlayTrigger placement="top" overlay={popover}>
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
                </OverlayTrigger>
            </div>
        )
    }

    /**
    * Purpose: if the component does not have a tooltip with it, then this renders
    * Params/Dependencies:
    * label
    * formValue
    * disabled
    */
    return (
        <div>
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