import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { useEffect } from "react";

/**
 * Purpose: a component that represents a world on the world page
 * Params: 
 * worldName: string, the name of the world
 * userId: string, the user id
 * type: string, whether the user owns the world or not (Joined or Owned)
 * worldId: string, the world id
 * userTheme: string, the user's color theme
 */
const World = ({ worldName, userId, type, worldId, userTheme }) => {
    // useState used so that we can set the content depending on joined/owned status
    var [ownOrJoin, setOwnOrJoin] = useState();
    var displayName = type === 'joined' ? 'Joined' : 'Owned';

    /**
     * Purpose: adds the buttons for the component depending on if its an owned or joined world
     * Params/Dependencies: 
     * type
     * userTheme
     * userId
     * worldId
     */
    useEffect(() => {
        // if it's owned by the user, add a manageworld popup and a remove world confirmation popup
        if (type === "created") {
            setOwnOrJoin([<ManageWorldPopup userTheme={userTheme} key={"MWP"} userId={userId} worldId={worldId} title="World Name" button={"Manage"} />,
            <ConfirmationPopup userTheme={userTheme} title={"Removing a worlds..."} content={`Are you sure you want to remove ${worldName}?`} type={"removeWorld"} action={{ userId, worldId }} key={"CP"} name={"Remove"} />])
        }
        // if it's not owned by the user, add a view world popup and a leave world confirmation popup
        else if (type === "joined") {
            setOwnOrJoin([<ViewWorldPopup userTheme={userTheme} key={"VWP"} worldId={worldId} name={"World Name"} />,
            <ConfirmationPopup userTheme={userTheme} title={"Leaving a world..."} content={`Are you sure you want to leave ${worldName}`} type={"leaveWorld"} action={{ userId, worldId }} key={"CP"} name={"Leave"} />])
        }

    }, [type, userTheme]);


    /**
     * Purpose: renders the world component
     * Params/Dependencies: 
     * userTheme
     * worldName
     * displayName
     * ownOrJoin
     */
    return (
        <>
            <InputGroup className={"mb-3 body_" + userTheme}>
                {/* joined or created depending */}
                <InputGroup.Text id="basic-addon3">
                    {displayName}
                </InputGroup.Text>
                {/*  the name of the world, disabled */}
                <Form.Control
                    value={worldName}
                    disabled={true}
                />
                {/* the buttons for this world depending on ownership */}
                {ownOrJoin}
            </InputGroup>
        </>
    );
};

export default World;