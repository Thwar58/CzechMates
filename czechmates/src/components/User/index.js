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
const User = ({ label, content, type, invalidNames, userInfo, userId, userTheme }) => {
    // a reference to the database
    const charRef = ref(db);
    // the value in the form and the function to set it, init to content
    var [formValue, setFormValue] = useState(content);
    var [editable, setEditable] = useState();
    var [disabled, setDisabled] = useState(true);
    var [validityMessage, setValidityMessage] = useState();
    var [changeName, setChangeName] = useState();
    // var [disableButton, setDisableButton] = useState(false);


    // when the db sends new information, this is triggered
    useEffect(() => {

        // if the form does not match the new input, then the form gets set to this new content
        // IMPORTANT: this prevents the loops of death db form update cycle
        if (content != formValue) {
            setFormValue(content);
        }

    }, [content]);

    useEffect(() => {
        if (type == "Name") {
            setEditable(
                <Button className={"btn_"+userTheme} onClick={click} variant="outline-secondary" id="button-addon2">
                    Edit
                </Button>);

        }

    }, [type]);

    useEffect(() => {
        if (type == "Name") {
            if (formValue !== content) {
                // check if the formvalue exists in the names already
                var taken = false;
                for (const [key, value] of Object.entries(invalidNames)) {
                    if (value.Name === formValue) {
                        taken = true;

                    }
                }

                if (taken === false) {
                    setEditable(
                        <>
                            <Button className={"btn_"+userTheme} onClick={setName} disabled={false} variant="outline-secondary" id="button-addon2">
                                Set
                            </Button>
                            <Button className={"btn_"+userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                                Cancel
                            </Button>
                        </>
                    );
                    setValidityMessage(<div style={{ color: "green" }}>This username is available</div>);
                }
                else if (taken === true) {
                    setEditable(
                        <>
                            <Button className={"btn_"+userTheme} onClick={setName} disabled={true} variant="outline-secondary" id="button-addon2">
                                Set
                            </Button>
                            <Button className={"btn_"+userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                                Cancel
                            </Button>
                        </>
                    );
                    setValidityMessage(<div style={{ color: "red" }}>This username is taken</div>);
                }
            }
            else {
                setValidityMessage();
            }

        }

    }, [formValue]);

    useEffect(() => {
        if (changeName === true) {

            setDisabled(true);
            setEditable(<Button onClick={click} variant="outline-secondary" id="button-addon2">
                Edit
            </Button>);
            setValidityMessage();

            const updates = {};

            if (userInfo.Friends !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Friends)) {
                    updates[`Users/${key}/Friends/${userId}`] = formValue;
                }
            }

            if (userInfo.Followers !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Followers)) {
                    updates[`Users/${key}/Following/${userId}`] = formValue;
                }
            }

            if (userInfo.Following !== undefined) {
                for (const [key, value] of Object.entries(userInfo.Following)) {
                    updates[`Users/${key}/Followers/${userId}`] = formValue;
                }
            }

            
            updates[`Users/${userId}/Name`] = formValue;
            console.log(updates);
            update(charRef, updates);
            setChangeName(false);
        }

    }, [changeName]);


    // a function used to send the form information to the database (used in button click below)
    //https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
    function click() {
        setDisabled(false);
        setEditable(
            <>
                <Button className={"btn_"+userTheme} onClick={setName} disabled={false} variant="outline-secondary" id="button-addon2">
                    Set
                </Button>
                <Button className={"btn_"+userTheme} onClick={cancel} variant="outline-secondary" id="button-addon2">
                    Cancel
                </Button>
            </>
        );
    }

    function setName() {
        setChangeName(true);
    }

    function cancel() {
        setDisabled(true);
        setEditable(<Button className={"btn_"+userTheme} onClick={click} variant="outline-secondary" id="button-addon2">
            Edit
        </Button>);
        setFormValue(content);
    }

    return (
        <div>

            {/* input group to surround the elements */}
            {validityMessage}
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
                    disabled={disabled}
                    // sets the formvalue variable to the form value when the form value changes
                    // https://www.reddit.com/r/reactjs/comments/153ndzq/how_to_refer_to_an_input_field_by_its_id_in_react/
                    onChange={e => setFormValue(e.target.value)}
                />
                {/* edit button, calls the click function */}
                {editable}
            </InputGroup>


        </div>
    );
};

export default User;