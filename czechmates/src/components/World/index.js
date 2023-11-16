import React from "react";
import ConfirmationPopup from "../ConfirmationPopup";
import ViewWorldPopup from '../ViewWorldPopup';
import ManageWorldPopup from '../ManageWorldPopup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

// a component to display the worlds with their button options
// input: the world name and the members
const World = ({ worldName, members, type }) => {

    var [ownOrJoin, setOwnOrJoin] = useState();

    useEffect(() => {

        if (type == "created"){
            setOwnOrJoin([<ManageWorldPopup members={members} title="World Name" button={"Manage"} />,
            <ConfirmationPopup name={"Remove"} />])
        }
        else if (type == "joined"){
            setOwnOrJoin([<ViewWorldPopup members={members} name={"World Name"} />, <ConfirmationPopup name={"Leave"} />])
        }

    }, [type]);

   

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
                {ownOrJoin}
                {/* pass members to the view world popup */}
                
                {/* have a confirmation popup for leaving or removing a world */}
               
            </InputGroup>
        </>
    );
};

export default World;