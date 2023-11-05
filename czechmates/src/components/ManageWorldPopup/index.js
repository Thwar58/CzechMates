// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import TypeAheadWithButton from "../TypeAheadWithButton";
import EUWithButtons from '../UEWithTwoButtons';
import UEInput from '../UEInput';
import { useEffect } from 'react';

// a function for the manage/add world modal, you pass in the title and the button display
function MWPopup({ title, button, members }) {
  // sets the initial state of the modal to hidden
  const [show, setShow] = useState(false);
  // handles the opening and closing of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var [mems, setMems] = useState([]);

  useEffect(() => {
    if (members !== undefined) {
      // console.log(charInfo);
      var arr = [];
      // https://flexiple.com/javascript/loop-through-object-javascript
      Object.values(members).forEach(val =>
        arr.push(<EUWithButtons key={val} value={val} button1={"View"} button2={"Remove"} />));
      setMems(arr);
    }
  }, [members]);


  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        {button}
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        {/* set the modal header */}
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {/* the modal body with the world information (editable by the user) */}
        <Modal.Body>
          <Form>
            {/* world name info */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <Form.Control
                placeholder="example name"
              />
              {/* world schedule */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <Form.Control
                placeholder="meeting days"
              />
            </Form.Group>
            {/* world members, which the user can view the character of or remove */}
            {/* future: add confirmation modal for remove */}
            <Form.Label>Members</Form.Label>
            {
              mems
            }
            {/* future: decide on search bar */}
            <Form.Group className="mb-3" controlId="Friends">
              <Form.Label>Invite Friends</Form.Label>
              <TypeAheadWithButton />
            </Form.Group>
            {/* the search code */}
            <Form.Group className="mb-3" controlId="Code">
              <Form.Label>Invite Code</Form.Label>
              <UEInput value={"Code here"} />
            </Form.Group>
          </Form>
          {/* the footer with the close button */}
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