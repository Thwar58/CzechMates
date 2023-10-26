// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropDown from '../Dropdown';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

// a component for the modal when you try to join a world from a code, you pass in the world name
function JoinCodePopup({ name }) {
    // set the initial state to be hidden
    const [show, setShow] = useState(false);

    // functions that open and close the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // dummy character data data
    const dummyCharacters = ["Char 1", "Char 2", "Char 3"];

    //handles page navigation
    const navigate = useNavigate();
    const navigateToGeneral = () => {
        // navigate to /subCharacterPages
        navigate('/subCharacterPages');
    }

    return (
        <>
            {/* the button that triggers the modal */}
            <Button variant="primary" onClick={handleShow}>
                Enter Join Code
            </Button>
            {/* the modal  */}
            <Modal show={show} onHide={handleClose}>
                {/* the header contains the name of the world */}
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to {name}</Modal.Title>
                </Modal.Header>
                {/* the body with 2 options for choosing a character: */}
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="ChooseCharacter">
                        {/* choosing an existing one from a dropdown (from the players character list) */}
                        <Form.Label>Choose an existing character</Form.Label>
                        <DropDown text={"Chosen: None"} actions={dummyCharacters} />
                        {/* future: we can move the button under the label with css */}
                        {/* creating a new character, this brings the user to the general sub character page */}
                        <Form.Label>Create a new character</Form.Label>
                        <Button onClick={navigateToGeneral}>Create New</Button>
                    </Form.Group>
                </Modal.Body>
                {/* the modal footer with the closing buttons */}
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default JoinCodePopup;