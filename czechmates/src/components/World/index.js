import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useEffect } from "react";

// a component to display the worlds with their button options
// input: the world name and the members
const World = ({ worldName, userId, type, worldId, userTheme }) => {

    //this is the placeholder for the component popup that holds either the view button or manage button
    var [ownOrJoin, setOwnOrJoin] = useState();
    //used to display if the world is owned or joined as the label
    var displayName = type === 'joined' ? 'Joined' : 'Owned';
    
    //puts the correct button in the ownOrJoin variable based on the type passed in
    useEffect(() => {
        if (type === "created"){
            setOwnOrJoin([<ManageWorldPopup userTheme={userTheme} key={"MWP"} userId={userId} worldId={worldId}  title="World Name" button={"Manage"} />,
            <ConfirmationPopup userTheme={userTheme} title={"Removing a worlds..."} content={`Are you sure you want to remove ${worldName}?`} type={"removeWorld"} action={{userId, worldId}} key={"CP"} name={"Remove"} />])
        }
        else if (type === "joined"){
            setOwnOrJoin([<ViewWorldPopup userTheme={userTheme} key={"VWP"} worldId={worldId} name={"World Name"} />, 
            <ConfirmationPopup userTheme={userTheme} title={"Leaving a world..."} content={`Are you sure you want to leave ${worldName}`} type={"leaveWorld"} action={{userId, worldId}} key={"CP"} name={"Leave"} />])
        }

    }, [type, userTheme]);

   
    //this is the world component is being built 
    return (
        <>
            <InputGroup className={"mb-3 body_"+userTheme}>
                {/* this is where we use the label 'joined' or 'owned' */}
                <InputGroup.Text id="basic-addon3">
                    {displayName}
                </InputGroup.Text>
                {/* input the value and disable the input */}
                <Form.Control
                    value={worldName}
                    disabled={true}
                />
                {/* pass the correct button into the world component */}
                {ownOrJoin}               
            </InputGroup>
        </>
    );
};

export default World;