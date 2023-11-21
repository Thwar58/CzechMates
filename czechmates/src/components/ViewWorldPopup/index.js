// https://react-bootstrap.netlify.app/docs/components/modal/
// i want to do this eventually with the buttons but for now we 
// https://stackoverflow.com/questions/61749345/add-button-inside-input-field-reactjs

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UEInput from '../UEInput';
import { useEffect } from 'react';

// a component for viewing world information (not editable by the user)
// input: the name of the world and the members
function VWPopup({ name, members }) {
  // set the default state of the modal to hidden
  const [show, setShow] = useState(false);

  // functions to handle opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  var [mems, setMems] = useState([]);

  useEffect(() => {
    // checks that the members are not undefined
    if (members !== undefined) {
      var arr = [];
      // loop through the member objects and create new components containing their information
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
      for (const [key, value] of Object.entries(members)) {
        arr.push(<UEInput key={key} value={value.CharacterName} creatorId={value.CreatorId} ></UEInput>);
      }
      setMems(arr);

    }
  }, [members]);


  return (
    <>
      {/* the button that triggers the modal */}
      <Button variant="primary" onClick={handleShow}>
        View
      </Button>

      {/* the modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        {/* the body has all of the world information */}
        <Modal.Body>
          <Form>
            {/* world name */}
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>World Name</Form.Label>
              <UEInput value={"Example Name"} />
            </Form.Group>
            {/* schedule */}
            <Form.Group className="mb-3" controlId="Schedule">
              <Form.Label>Schedule</Form.Label>
              <UEInput value={"Meeting day"} />
            </Form.Group>
            {/* members */}
            <Form.Group className="mb-3" controlId="Members">
              <Form.Label>Members</Form.Label>
              {/* the array of members components */}
              {
                mems
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* the modal footer with the button to close it */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VWPopup;