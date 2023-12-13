import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useEffect } from "react";
import { db } from '../../firebase';
import { ref, update } from "firebase/database";

/**
 * Purpose: a component that displays the username and the email in the profile page
 * Params: 
 * label: string, the text for the description on the left
 * content: string, the text for inside of the component
 * type: string, they type (email or username)
 * invalidName: JSON object, a list of all the names in the database
 * userInfo: JSON object, all of the usre's friends, following, and follower information
 * userId: string, the user's id
 * userTheme: string, the user's color theme
 */
const User = ({ label, content, type, invalidNames, userInfo, userId, userTheme }) => {
    // a reference to the database
    const charRef = ref(db);
    // useStates to track the value, editability, and validity of the field
    var [formValue, setFormValue] = useState(content);
    var [editable, setEditable] = useState();
    var [disabled, setDisabled] = useState(true);
    var [validityMessage, setValidityMessage] = useState();
    var [changeName, setChangeName] = useState();


    /**
     * Purpose: checks the value coming in from the database against the vakue in the form
     * used to prevent infinite updates between the database and the component
     * Params/Dependencies: 
     * content
     * formValue
     */
    useEffect(() => {
        if (content != formValue) {
            setFormValue(content);
        }
    }, [content]);

    /**
     * Purpose: adds the edit button if this is the username componenent
     * Params/Dependencies: 
     * type
     * userTheme
     */
    useEffect(() => {
        if (type == "Name") {
            setEditable(
                <Button className={"btn_" + userTheme} onClick={click} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>);
        }
    }, [type]);

    /**
     * Purpose: checks the validity of a username when the user tries to change it
     * Params/Dependencies: 
     * type
     * content
     * invalidNames
     * userTheme
     */
    useEffect(() => {
        if (type == "Name") {
            // if the user has entered a name that is different from their current name
            if (formValue !== content) {
                var taken = false;
                // check if any other user's in the database have that name
                for (const [key, value] of Object.entries(invalidNames)) {
                    if (value.Name === formValue) {
                        taken = true;
                    }
                }
                // if nobody else has taken that name, then enable the set button and inform the user that it is available
                if (taken === false) {
                    setEditable(
                        <>
                            <Button className={"btn_" + userTheme} onClick={setName} disabled={false} variant="outline-secondary" id="button-addon2">
                                Set
                            </Button>
                            <Button className={"btn_" + userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                                Cancel
                            </Button>
                        </>
                    );
                    setValidityMessage(<div style={{ color: "green" }}>This username is available</div>);
                }
                // if the name is taken, then disable the set button and inform the user
                else if (taken === true) {
                    setEditable(
                        <>
                            <Button className={"btn_" + userTheme} onClick={setName} disabled={true} variant="outline-secondary" id="button-addon2">
                                Set
                            </Button>
                            <Button className={"btn_" + userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                                Cancel
                            </Button>
                        </>
                    );
                    setValidityMessage(<div style={{ color: "red" }}>This username is taken</div>);
                }
            }
            // otherwise, clear the message
            else {
                setValidityMessage();
            }
        }

    }, [formValue]);

    /**
     * Purpose: updates the current user's name anywhere else it exists in the database
     * Params/Dependencies: 
     * changeName
     * formValue
     * userInfo
     * userId
     */
    useEffect(() => {
        // if the user is changing their name, revert the component to it's original buttons and clear the messages
        if (changeName === true) {
            setDisabled(true);
            setEditable(<Button className={"btn_" + userTheme}  onClick={click} variant="outline-secondary" id="button-addon2">
                Edit
            </Button>);
            setValidityMessage();
            // update the user's name in their friends, following, and followers lists
            const updates = {};
            // update each of the friends lists
            if (userInfo.Friends !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Friends)) {
                    updates[`Users/${key}/Friends/${userId}`] = formValue;
                }
            }
            // update each of the followers lists
            if (userInfo.Followers !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Followers)) {
                    updates[`Users/${key}/Following/${userId}`] = formValue;
                }
            }
            // update each of the following lists
            if (userInfo.Following !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Following)) {
                    updates[`Users/${key}/Followers/${userId}`] = formValue;
                }
            }
            // update teh username for their user profile
            updates[`Users/${userId}/Name`] = formValue;
            update(charRef, updates);
            setChangeName(false);
        }

    }, [changeName]);


    /**
     * Purpose: adds the set and cancel button to the username component when the user is editing it
     * Params/Dependencies: 
     * usertheme
     */
    //https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
    function click() {
        setDisabled(false);
        setEditable(
            <>
                <Button className={"btn_" + userTheme} onClick={setName} disabled={false} variant="outline-secondary" id="button-addon2">
                    Set
                </Button>
                <Button className={"btn_" + userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                    Cancel
                </Button>
            </>
        );
    }

    /**
     * Purpose: sets the trigger to change the name to true
     * Params/Dependencies: 
     * none
     */
    function setName() {
        setChangeName(true);
    }

    /**
     * Purpose: cancels the name change if the user changes their mind
     * Params/Dependencies: 
     * content
     * userTheme
     */
    function cancel() {
        setDisabled(true);
        setEditable(<Button className={"btn_" + userTheme} onClick={click} variant="outline-secondary" id="button-addon2">
            Edit
        </Button>);
        setFormValue(content);
    }

    /**
     * Purpose: renders the user component for the email and name
     * Params/Dependencies: 
     * validityMessage
     * formValue
     * disabled
     * editable
     */
    return (
        <div>
            {/* the message for whether this name is available or not */}
            {validityMessage}
            <InputGroup className="mb-3">
                {/* set the text label */}
                <InputGroup.Text id="basic-addon3">
                    {label}
                </InputGroup.Text>
                <Form.Control
                    // sets the form value 
                    value={formValue}
                    // enables or disable this input 
                    disabled={disabled}
                    // sets the formvalue variable to the form value when the form value changes
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
                {/* the buttons for editing this component */}
                {editable}
            </InputGroup>


        </div>
    );
};

export default User;