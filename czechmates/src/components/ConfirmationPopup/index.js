// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// a component for the confirmation modal
function ConfirmationPopup({name}) {
  // sets the default state of the modal
  const [show, setShow] = useState(false);

  // handles opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // returns a div with the button that triggers the modal as well as the modal content
  return (
    <>
    {/* the button that triggers the modal */}
      <Button id={"ModalButton" + name} variant="primary" onClick={handleShow}>
        {name}
      </Button>
      {/* the modal with the information */}
      <Modal id={"Modal" + name} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {/* modal title */}
          <Modal.Title>Confirm (action)</Modal.Title>
        </Modal.Header>
        {/* modal body */}
        <Modal.Body>
            <p>(Message asking if the user is sure of their choice)</p>
        </Modal.Body>
        {/* modal footer with the closing buttons */}
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

export default ConfirmationPopup;