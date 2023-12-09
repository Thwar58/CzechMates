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

    var [ownOrJoin, setOwnOrJoin] = useState();
    var displayName = type === 'joined' ? 'Joined' : 'Owned';
    

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

   

    return (
        <>
            <InputGroup className={"mb-3 body_"+userTheme}>
                <InputGroup.Text id="basic-addon3">
                    {displayName}
                </InputGroup.Text>
                {/* input the value and disable the input */}
                <Form.Control
                    value={worldName}
                    disabled={true}
                />
                {/* pass members to the manage world popup */}
                {ownOrJoin}
                {/* pass members to the view world popup */}
                
                {/* have a confirmation popup for leaving or removing a world */}
               
            </InputGroup>
        </>
    );
};

export default World;