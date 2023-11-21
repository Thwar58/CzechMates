import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

// a component to display the worlds with their button options
// input: the world name and the members
const World = ({ worldName, members }) => {

    return (
        <>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon3">
                    World
                </InputGroup.Text>
                {/* input the value and disable the input */}
                <Form.Control
                    value={worldName}
                    disabled={true}
                />
                {/* pass members to the manage world popup */}
                <ManageWorldPopup members={members} title="World Name" button={"Manage"} />
                {/* pass members to the view world popup */}
                <ViewWorldPopup members={members} name={"World Name"} />
                {/* have a confirmation popup for leaving or removing a world */}
                <ConfirmationPopup name={"Remove/Leave"} />
            </InputGroup>
        </>
    );
};

export default World;