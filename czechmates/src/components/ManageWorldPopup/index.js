// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TypeAheadWithButton from "../TypeAheadWithButton";
import Member from '../Member';
import UEInput from '../UEInput';

function MWPopup({ name }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Manage
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>World Name</Form.Label>
              <Form.Control
                placeholder="example name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                placeholder="meeting days"
              />
            </Form.Group>
            <Form.Label>Members</Form.Label>
            <Member value={"member 1"} />
            <Member value={"member 2"} />
            <Member value={"member 3"} />
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Invite Friends</Form.Label>
              <TypeAheadWithButton />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Invite Code</Form.Label>
              <UEInput value={"Code here"} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MWPopup;