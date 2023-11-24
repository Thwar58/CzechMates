// https://react-bootstrap.netlify.app/docs/components/modal/

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getDatabase, ref, child, update, get } from "firebase/database";
import { db } from '../../firebase';

// a component for the confirmation modal
function ViewCharaPopup({setAlign}) {

  console.log("set align in viewchara", setAlign);
  // sets the default state of the modal
  const [show, setShow] = useState(false);

  // handles opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function closeAndAlign(){
    handleClose();
    setAlign("mwPopupCenter");
  }

  function openAndAlign(){
    handleShow();
    setAlign("mwPopupLeft");
  }


  // returns a div with the button that triggers the modal as well as the modal content
  return (
    <>
      {/* the button that triggers the modal */}
      <Button id={"ModalButton" + "name"} variant="primary" onClick={openAndAlign}>
        {"View"}
      </Button>
      {/* the modal with the information */}
      <Modal dialogClassName={"mwPopupRight"} id={"Modal" + "name"} show={show} onHide={closeAndAlign}>
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
          <Button variant="secondary" onClick={closeAndAlign}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewCharaPopup;