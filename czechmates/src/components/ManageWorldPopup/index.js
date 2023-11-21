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
// input: the title of the popup, the button to trigger the modal, and the members to display
function MWPopup({ title, button, members }) {
  // sets the initial state of the modal to hidden
  const [show, setShow] = useState(false);
  // handles the opening and closing of the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // a variable to set and track the members of a world
  var [mems, setMems] = useState([]);

  // when members changes, this is triggered
  useEffect(() => {
    // check that members is not undefined otherwise it will throw an error
    if (members !== undefined) {
      // loop through the members objects and create components to display them, set the members array at the end
      var arr = [];
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(members)) {
        // pass in the key, the character name, and the id of who created the character
        arr.push(<EUWithButtons key={key} value={value.CharacterName} creatorId={value.CreatorId} button1={"View"} button2={"Remove"} />);
      }
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
            {/* the array of members components */}
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