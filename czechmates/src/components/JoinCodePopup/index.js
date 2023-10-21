// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DropDown from '../Dropdown';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function JoinCodePopup({ name }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dummyCharacters = ["Char 1", "Char 2", "Char 3"];

    const navigate = useNavigate();

    const navigateToGeneral = () => {
        // 👇️ navigate to /contacts
        navigate('/subCharacterPages');
    }


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Enter Join Code
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Choose an existing character</Form.Label>
                        <DropDown text={"Chosen: None"} actions={dummyCharacters} />
                        {/* we can move the button under the label with css later on */}
                        <Form.Label>Create a new character</Form.Label>
                        <Button onClick={navigateToGeneral}>Create New</Button>
                    </Form.Group>
                </Modal.Body>
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